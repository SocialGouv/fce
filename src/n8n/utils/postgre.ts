import parse  from "csv-parse";
import stringify from "csv-stringify";
import { Duplex, Transform } from "stream";
import { decode } from "html-entities";
import replaceStream from "replacestream";
import { formatDate } from "./date";
import pipe from "multipipe";
import { IExecuteFunctions } from "n8n-core";
import { Pool, PoolClient } from "pg";
import {parse as parseDate} from "date-fns";

export const sanitizeHtmlChars = (): Transform => {
  const htmlEntitiesRegex = /&(?:[a-z]+|#x?\d+);/gi

  return replaceStream(htmlEntitiesRegex, (entity) => decode(entity));
}

export const createPool = (context: IExecuteFunctions) => {
  const pgCreds = context.getCredentials("postgres");

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
  columns: Record<string, string>;
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

export const deduplicate = (field: string | undefined) => {
  const keys: any[] = [];
  return new Transform({
    objectMode: true,
    transform(chunk: any, encoding: string, callback) {
      if (!field) {
        this.push(chunk);
        callback();
        return;
      }
      if (chunk[field] && !keys.includes(chunk[field])) {
        this.push(chunk);
        keys.push(chunk[field]);
      }
      callback();
    }
  });
}

export const parseCsv = ({ columns, delimiter = ";" }: MapCsvConfig) => parse({
  delimiter,
  columns: (header: string[]) =>
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

export const padSiren = padStream("siren", 9);

export const padSiret = padStream("siret", 14);
