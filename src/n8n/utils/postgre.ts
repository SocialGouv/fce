import parse  from "csv-parse";
import stringify from "csv-stringify";
import { Duplex, Transform } from "stream";
import { decode } from "html-entities";
import replaceStream from "replacestream";
import { formatDate } from "./date";
import pipe from "multipipe";

export const sanitizeHtmlChars = (): Transform => {
  const htmlEntitiesRegex = /&(?:[a-z]+|#x?\d+);/gi

  return replaceStream(htmlEntitiesRegex, (entity) => decode(entity));
}

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
    header.map((column) => columns[column] || column),
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
  format: string;
};

type DateStreamReturn = {
  transform: Duplex,
  getMaxDate: () => string | undefined
};

export const dateStream = (date: DateParam): DateStreamReturn => {
  let maxDate: string | undefined;

  const transform = pipe(
    mapRow(
      (row: Record<string, string>) => ({
        ...row,
        [date.field]: formatDate(row[date.field]),
      })
    ),
    mapRow((row: Record<string, string>) => {
      if (!maxDate || maxDate < row[date.field]) {
        maxDate = row[date.field];
      }
      return row;
    })
  );

  const getMaxDate = (): string | undefined => maxDate;

  return {
    transform,
    getMaxDate,
  }
}
