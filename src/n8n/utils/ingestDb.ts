import {IExecuteFunctions} from "n8n-core";
import {Pool} from "pg";
import {createReadStream} from "fs";
import * as path from "path";
import copy from "pg-copy-streams";
import {DOWNLOAD_STORAGE_PATH} from "./constants";
import {identityTransform, promisifyStream} from "./stream";
import {
  connect,
  createPool, dateStream,
  deduplicate,
  filterRows,
  mapRow, padSiren, padSiret,
  parseCsv,
  sanitizeHtmlChars,
  stringifyCsv
} from "./postgre";
import {Transform} from "stream";
import {format} from "date-fns";

export type IngestDbConfig = {
  fieldsMapping: Record<string, string>;
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
  deduplicateField?: string;
  truncateRequest?: string;
  nonEmptyFields?: string[];
  separator?: string;
  transform?: Transform;
}

export const ingestDb = async (context: IExecuteFunctions, params: IngestDbConfig, postgrePool?: Pool) => {
  const pgCreds = context.getCredentials("postgres");

  const pool = postgrePool || createPool(context)

  const nonEmptyFields = params.nonEmptyFields || [];

  const columns = [
    ...Object.values(params.fieldsMapping),
    ...(params.generateSiren ? [ "siren" ] : []),
  ];

  const { transform: dateTransform, getMaxDate } = params.date ? dateStream(params.date) : {
    transform: identityTransform(),
    getMaxDate: (): void => {}
  };

  const readStream = createReadStream(path.join(DOWNLOAD_STORAGE_PATH, params.filename))
    .pipe(sanitizeHtmlChars())
    .pipe(parseCsv({ columns: params.fieldsMapping, delimiter: params.separator }))
    .pipe(filterRows((row) => !nonEmptyFields.some(field => !row[field])))
    .pipe(deduplicate(params.deduplicateField))
    .pipe(dateTransform)
    .pipe(params.padSiren ? padSiren : identityTransform())
    .pipe(params.padSiret ? padSiret : identityTransform())
    .pipe(mapRow((row: Record<string, string>) => {
      if (!params.generateSiren) {
        return row;
      }

      return {
        ...row,
        siren: row.siret.substring(0, 9),
      }
    }))
    .pipe(params.transform || identityTransform())
    .pipe(stringifyCsv({ columns }));

  const truncateRequest = params.truncateRequest || `TRUNCATE TABLE ${params.table};`;

  const client = await connect(pool);

  if (params.truncate) {
    await client.query(truncateRequest);
  }

  await promisifyStream(readStream
    .pipe(
      client.query(copy.from(`COPY ${params.table}(${columns.join(",")}) FROM STDIN WITH (format csv, header true, delimiter ';');`))
    )
  );

  if (params.date) {
    const query = `UPDATE import_updates SET date = '${format(getMaxDate() || new Date(), "yyyy-MM-dd")}',
                          date_import = CURRENT_TIMESTAMP WHERE "table" = '${params.table}';`;

    await client.query(query);
  }

  return [context.helpers.returnJsonArray({
    ...pgCreds,
    ...params
  })];
}
