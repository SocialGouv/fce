import parse from "csv-parse";
import stringify from "csv-stringify";
import { Duplex, Readable, Transform } from "stream";
import { decode } from "html-entities";
import replaceStream from "replacestream";
import { formatDate } from "./date";
import pipe from "multipipe";
import { IExecuteFunctions } from "n8n-core";
import { ClientBase, Pool, PoolClient } from "pg";
import { parse as parseDate } from "date-fns";
import { promisifyStream } from "./stream";
import copy from "pg-copy-streams";
import {LargeSet} from "./large-set";

type Constraint = {
  nspname: string;
  relname: string;
  conname: string;
  constraintdef: string;
}

export const getAllConstraints = async (client: ClientBase, tablename: string) => {
  const response = await client.query(`
    SELECT nspname, relname, conname, pg_get_constraintdef(con.oid) as constraintdef
       FROM pg_catalog.pg_constraint con
          INNER JOIN pg_catalog.pg_class rel
              ON rel.oid = con.conrelid
          INNER JOIN pg_catalog.pg_namespace nsp
              ON nsp.oid = connamespace
          WHERE nsp.nspname = 'public'
            AND rel.relname = '${tablename}';
  `);

  return response.rows;
}

const dropConstraint = async (client: ClientBase, {nspname, relname, conname}: Constraint) =>
  client.query(`ALTER TABLE ${nspname}."${relname}" DROP CONSTRAINT "${conname}"`)

export const dropConstraints = async (client: ClientBase, constraints: Constraint[]) => {
  await Promise.all(constraints.map((constraint) => dropConstraint(client, constraint)));
}

export const createConstraint = async (client: ClientBase, {nspname, relname, conname, constraintdef}: Constraint) =>
  client.query(`ALTER TABLE ${nspname}."${relname}" ADD CONSTRAINT "${conname}" ${constraintdef}`)

export const createConstraints = async (client: ClientBase, constraints: Constraint[]) => {
  await Promise.all(constraints.map((constraint) => createConstraint(client, constraint)));
}

export type Index = {
  tablename: string;
  indexname: string;
  indexdef: string;
  unique: boolean
};

export const getAllIndexes = async (client: ClientBase, tablename: string) => {
  const response = await client.query(`
    SELECT pgc.relname as indexname,
           pgi.indisunique as "unique",
           pgidx.indexdef as indexdef,
           pgt.relname as tablename
    FROM pg_index AS pgi
        JOIN pg_class pgc ON pgc.oid = pgi.indexrelid
        JOIN pg_class pgt ON pgt.oid = pgi.indrelid
        JOIN pg_indexes pgidx ON pgc.relname = pgidx.indexname
    WHERE pgt.relname like '${tablename}'
  `);

  return response.rows;
}

export const deleteIndex = async (client: ClientBase, index: Index) => {
    await client.query(`DROP INDEX ${index.indexname}`);
}

export const deleteIndexes = async (client: ClientBase, indexes: Index[]) => {
  await Promise.all(indexes.map(index => deleteIndex(client, index)));
}

export const createIndex = async (client: ClientBase, index: Index) => {
  await client.query(index.indexdef);
}

export const createIndexes = async (client: ClientBase, indexes: Index[]) => {
  await Promise.all(indexes.map((index) => createIndex(client, index)));
}

export const sanitizeHtmlChars = (): Transform => {
    const htmlEntitiesRegex = /&(?:[a-z]+|#x?\d+);/gi

    return replaceStream(htmlEntitiesRegex, (entity) => decode(entity));
}

export const createPool = async (context: IExecuteFunctions) => {
    const pgCreds = await context.getCredentials("postgres");

    return new Pool({
        ...pgCreds,
        ssl: pgCreds && pgCreds.ssl !== "disable"
    });
}

export const connect = (pool: Pool) => new Promise<PoolClient>((resolve, reject) => {
    pool.connect((err, client) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(client);
    });
});

type MapCsvConfig = {
    columns: Record<string, string> | string[];
    delimiter?: string;
};

export const filterRows = (predicate: (params: any) => boolean) => new Transform(
    {
        objectMode: true,
        transform(chunk, encoding, callback) {
            if (predicate(chunk)) {
                this.push(chunk);
            }
            callback();
        }
    }
)

export const mapRow = <T, U>(transform: (input: T) => U) => new Transform({
    objectMode: true,
    transform(chunk: any, encoding: string, callback) {
        this.push(transform(chunk));
        callback();
    }
});

export const tapRow = (fn: (arg: any) => void) => mapRow<any, any>((val) => {
  fn(val);
  return val;
})

export const logRow = () => mapRow<any, any>((val) => {
    console.log(JSON.stringify(val));
    return val;
})

const isString = <T>(value: string | T): value is string => typeof value === "string";

export const deduplicate = (field: string | string[] | undefined) => {
    const keys = new LargeSet<any>();

    return new Transform({
        objectMode: true,
        transform(chunk: any, encoding: string, callback) {
            if (!field) {
                this.push(chunk);
                callback();
                return;
            }

            const arrayField = isString(field) ? [field] : field;

            const key = arrayField.reduce((res, field) => {
                res.push(chunk[field]);
                return res;
            }, [] as string[]).join("|");

            if (key && !keys.has(key)) {
                this.push(chunk);
                keys.add(key);
            }

            callback();
        }
    });
}

export const parseCsv = ({ columns, delimiter = ";" }: MapCsvConfig) => parse({
    delimiter,
    columns: Array.isArray(columns)
        ? columns
        : (header: string[]) =>
            header.map((column) => columns[column.trim()] || column),
});

type StringifyCsvOptions = {
    columns: string[]
};

export const stringifyCsv = ({ columns }: StringifyCsvOptions) => stringify({
    header: true,
    delimiter: ";",
    columns,
});

type DateParam = {
    field: string;
    inputFormat?: string;
    outputFormat: string;
};

type DateStreamReturn = {
    transform: Duplex,
    getMaxDate: () => Date | undefined
};

export const dateStream = (date: DateParam): DateStreamReturn => {
    let maxDate: Date | undefined;

    const transform = pipe(
        mapRow(
            (row: Record<string, string>) => ({
                ...row,
                [date.field]: formatDate(row[date.field], date),
            })
        ),
        mapRow((row: Record<string, string>) => {
            const rowDate = parseDate(row[date.field], date.outputFormat, new Date());
            if (!maxDate || maxDate < rowDate) {
                maxDate = rowDate;
            }
            return row;
        })
    );

    const getMaxDate = (): Date | undefined => maxDate;

    return {
        transform,
        getMaxDate,
    }
}

const padStream = (field: string, length: number) => mapRow((row: Record<string, string>) => ({
    ...row,
    [field]: row[field].padStart(length, '0')
}));

export const padSiren = () => padStream("siren", 9);

export const padSiret = () => padStream("siret", 14);

export const truncateTable = (client: ClientBase, tableName: string) =>
    client.query(`TRUNCATE TABLE ${tableName};`);

type ConflictSafeInsertOptions = {
    table: string;
    columns: string[];
}

export type InsertMethod = (client: ClientBase, stream: Readable, options: ConflictSafeInsertOptions) => Promise<void>;

/**
 * Insertion that avoids conflicts by creating a temporary table
 * @param client
 * @param stream
 * @param table
 * @param columns
 */
export const conflictSafeInsert = (conflictQuery = "DO NOTHING"): InsertMethod => async (client: ClientBase, stream: Readable, {
    table,
    columns
}: ConflictSafeInsertOptions) => {
    const tempTableName = `temp_${table}_${Date.now()}`;

    await client.query(`CREATE TABLE ${tempTableName} (LIKE ${table} INCLUDING ALL);`);

    await promisifyStream(stream
        .pipe(
            client.query(copy.from(`COPY ${tempTableName}(${columns.join(",")}) FROM STDIN WITH (format csv, header true, delimiter ';');`))
        )
    );

    await client.query(`INSERT INTO ${table} SELECT * from ${tempTableName} ON CONFLICT ${conflictQuery};`);

    await client.query(`DROP TABLE ${tempTableName};`);
}

const makePostgreCopyStreamGenerator = (client: ClientBase, {
  table,
  columns
}: ConflictSafeInsertOptions) => client.query(copy.from(`COPY ${table}(${columns.join(",")}) FROM STDIN WITH (format csv, header true, delimiter ';');`))

/**
 * Fast insertion that bypasses conflict resolutions. May fail in case of unicity conflicts.
 * @param client
 * @param stream
 * @param table
 * @param columns
 */
export const fastInsert: InsertMethod= async (client: ClientBase, stream: Readable, {
    table,
    columns
}: ConflictSafeInsertOptions) => {
    await promisifyStream(stream
        .pipe(
            makePostgreCopyStreamGenerator(client, { table, columns })
        )
    );
}
