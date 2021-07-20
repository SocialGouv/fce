import parse  from "csv-parse";
import stringify from "csv-stringify";
import {Transform} from "stream";
import { decode } from "html-entities";
import replaceStream from "replacestream";

export const sanitizeHtmlChars = (): Transform => {
  const htmlEntitiesRegex = /&(?:[a-z]+|#x?\d+);/gi

  return replaceStream(htmlEntitiesRegex, (entity) => decode(entity));
}

type MapCsvConfig = {
  columns: Record<string, string>
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

export const parseCsv = ({ columns }: MapCsvConfig) => parse({
  delimiter: ";",
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
