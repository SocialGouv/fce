import { IExecuteFunctions } from "n8n-core";
import { Pool } from "pg";
import {createReadStream, createWriteStream} from "fs";
import * as path from "path";
import { DOWNLOAD_STORAGE_PATH } from "./constants";
import {identityTransform, promisifyStream} from "./stream";
import {
  conflictSafeInsert,
  connect,
  createConstraints,
  createIndexes,
  createPool,
  dateStream,
  deduplicate,
  deleteIndexes,
  dropConstraints,
  fastInsert,
  filterRows,
  getAllConstraints,
  getAllIndexes, InsertMethod,
  mapRow,
  padSiren,
  padSiret,
  parseCsv,
  sanitizeHtmlChars,
  stringifyCsv,
} from "./postgre";
import { Transform } from "stream";
import { format } from "date-fns";
import { decodeStream } from "iconv-lite";
import {createPostgreInserter, Inserter} from "./inserters";

// tslint:disable-next-line:no-any
export type IngestDbConfig<InserterData = any> = {
  fieldsMapping: Record<string, string> | string[];
  table: string;
  replaceHtmlChars?: boolean;
  truncate?: boolean;
  filename: string;
  date?: {
    field: string;
    inputFormat?: string;
    outputFormat: string;
  };
  padSiren?: boolean;
  padSiret?: boolean;
  generateSiren?: boolean;
  deduplicateField?: string | string[];
  truncateRequest?: string;
  nonEmptyFields?: string[];
  separator?: string;
  transform?: () => Transform;
  updateHistoryQuery?: string;
  bypassConflictSafeInsert?: boolean;
  sanitizeHtmlChars?: boolean;
  conflictQuery?: string;
  encoding?: "windows-1252" | "utf8",
  addedColumns?: string[],
  inputStream?: (filename: string) => NodeJS.ReadableStream,
  label?: string,
  createTemporaryFile?: boolean,
  keepConstraints?: boolean
  inserter?: Inserter<InserterData>
};

export const ingestDb = async (context: IExecuteFunctions, params: IngestDbConfig, postgrePool?: Pool) => {
  // tslint:disable-next-line:no-any
  const inserter = params.inserter ||
    createPostgreInserter(params, postgrePool || await createPool(context));

  const pool = postgrePool || await createPool(context);

  const nonEmptyFields = params.nonEmptyFields || [];

  const columns = [
    ...Object.values(params.fieldsMapping),
    ...(params.generateSiren ? ["siren"] : []),
    ...params.addedColumns ?? []
  ];

  const { transform: dateTransform, getMaxDate } = params.date ? dateStream(params.date) : {
    transform: identityTransform(),
    getMaxDate: (): void => { }
  };

  const input = params.inputStream ? params.inputStream : (filename: string) => createReadStream(path.join(DOWNLOAD_STORAGE_PATH, filename));
  let counter = 0;
  let prevCounter = 0;
  let time = Date.now();

  if (params.label) {
    console.log(`Starting ${params.label}`);
  }

  // tslint:disable-next-line:no-any
  let stream: any = input(params.filename);

  if (params.encoding === "windows-1252") {
    stream = stream.pipe(decodeStream("win1252"));
  }

  if (params.sanitizeHtmlChars !== false) {
    stream = stream.pipe(sanitizeHtmlChars());
  }

  stream = stream.pipe(parseCsv({ columns: params.fieldsMapping, delimiter: params.separator }));

  if (params.nonEmptyFields && params.nonEmptyFields.length > 0) {
    stream = stream.pipe(filterRows((row) => !nonEmptyFields.some(field => !row[field])));
  }

  if (params.padSiren) {
    stream = stream.pipe(padSiren());
  }

  if (params.padSiret) {
    stream = stream.pipe(padSiret());
  }

  if (params.deduplicateField) {
    stream = stream.pipe(deduplicate(params.deduplicateField));
  }

  if (params.generateSiren) {
    stream = stream.pipe(mapRow((row: Record<string, string>) => ({
      ...row,
      siren: row.siret.substring(0, 9),
    })));
  }

  if (params.transform) {
    stream = stream.pipe(params.transform());
  }

  if (params.date) {
    stream = stream.pipe(dateTransform);
  }

  stream = stream.pipe(mapRow((row) => {
      counter ++;
      if (Date.now() - time > 5000) {
        console.log(`${params.label} | ${counter} | ${(counter - prevCounter)/(Date.now() - time)} bps`);
        time = Date.now();
        prevCounter = counter;
      }

      return row;
    }))
    .pipe(stringifyCsv({
      columns
    }));

  // tslint:disable-next-line:no-any
  stream.on("error", (error: any) => {
    console.error(error);
  });
  stream.setMaxListeners(20);

  const client = await connect(pool);

  if (params.truncate) {
    const truncateRequest = params.truncateRequest || `TRUNCATE TABLE ${params.table};`;

    await client.query(truncateRequest);
  }

  const inserterOnInitOutput = await inserter?.onInit?.();

  let error: Error | null = null;

  try {
    await inserter.insert(client, stream, {
      table: params.table,
      columns
    });

    if (params.date) {
      const query = `UPDATE import_updates SET date = '${format(getMaxDate() || new Date(), "yyyy-MM-dd")}',
                  date_import = CURRENT_TIMESTAMP WHERE "table" = '${params.table}';`;

      await client.query(query);
    } else if (params.updateHistoryQuery) {
      await client.query(params.updateHistoryQuery);
    }
  } catch(err) {
    error = err as Error;
  }

  await inserter?.onTeardown?.(inserterOnInitOutput);

  if (error) {
    throw error;
  }

  return [context.helpers.returnJsonArray({})];
};
