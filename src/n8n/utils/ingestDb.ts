import {IExecuteFunctions} from "n8n-core";
import {Pool} from "pg";
import {createReadStream} from "fs";
import * as path from "path";
import copy from "pg-copy-streams";
import {dateStream, deduplicate, filterRows, mapRow, parseCsv, sanitizeHtmlChars, stringifyCsv} from "./postgre";
import {DOWNLOAD_STORAGE_PATH} from "./constants";
import {identityTransform, promisifyStream} from "./stream";

export type IngestDbConfig = {
  fieldsMapping: Record<string, string>;
  table: string;
  replaceHtmlChars?: boolean;
  truncate?: boolean;
  filename: string;
  date?: {
    field: string;
    format: string;
  };
  padSiren?: boolean;
  generateSiren?: boolean;
  deduplicateField?: string;
  truncateRequest?: string;
  nonEmptyFields?: string[];
  separator?: string;
}

const identity = <T>(value: T) => value;

export const ingestDb = async (context: IExecuteFunctions, params: IngestDbConfig) => {
  const pgCreds = context.getCredentials("postgres");

  const pool = new Pool({
    ...pgCreds,
    ssl: pgCreds && pgCreds.ssl !== "disable"
  });

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
    .pipe(
      mapRow<Record<string, string>, Record<string, string>>(
        params.padSiren ?
          (row: Record<string, string>) => ({
            ...row,
            siren: row.siren.padStart(9, '0'),
          }):
          identity
      ))
    .pipe(mapRow((row: Record<string, string>) => {
      if (!params.generateSiren) {
        return row;
      }

      return {
        ...row,
        siren: row.siret.substring(0, 9),
      }
    }))
    .pipe(stringifyCsv({ columns }));

  const truncateRequest = params.truncateRequest || `TRUNCATE TABLE ${params.table};`;

  await new Promise<void>((resolve, reject) => {
      pool.connect(async (err, client) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        if (params.truncate) {
          await client.query(truncateRequest);
        }
        try {
          await promisifyStream(readStream
            .pipe(
              client.query(copy.from(`COPY ${params.table}(${columns.join(",")}) FROM STDIN WITH (format csv, header true, delimiter ';');`))
            )
          );
        } catch (err) {
          reject(err);
          return;
        }


        if (params.date) {
          const query = `UPDATE import_updates SET date = '${getMaxDate()}',
                          date_import = CURRENT_TIMESTAMP WHERE "table" = '${params.table}';`;

          try {
            await client.query(query);
          } catch(err) {
            reject(err);
            return;
          }
        }

        resolve();
      });
    })

  return [context.helpers.returnJsonArray({
    ...pgCreds,
    ...params
  })];
}
