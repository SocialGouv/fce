import {format, getYear, parse, subYears} from "date-fns";
import * as path from "path";
import { pipe } from "lodash/fp";
import {IDataFrame} from "data-forge";

export type SiPsiKey = "siren" | "siret";

const getFilenameFromPath = path.basename;


const downloadRegex = new RegExp(`^ClientsPSI-([A-z]*)-([0-9]*)-([0-9]*)\\.csv$`, "i");

const getDateFromFilename = (filename: string) => downloadRegex.exec(filename);

const normalizeDate = (match: string[] | null) => match && match[3] ? format(parse(match[3], "ddMMyyyy", new Date()), "yyyy-MM-dd") : "";

export const getSiPsiFileDate =
  pipe(
    getFilenameFromPath,
    getDateFromFilename,
    normalizeDate
  );

export const getFileYear = (filename: string): string => {
  const match = downloadRegex.exec(filename);

  return match ? match[2] : "";
};

export const getFileType = (filename: string): SiPsiKey => {
  const match = downloadRegex.exec(filename);

  return (match ? match[1] : "").toLowerCase() as SiPsiKey;
};

export const getSiPsiColumnName = (year: string, years: string[]) =>
    +year === Math.max(...years.map(y => +y)) ? "salaries_annee_courante" : "salaries_annee_precedente"

export const getEffectifColumnName = (columnNames: string[]) =>
    columnNames.find((column) => /salaries_distincts/.test(column)) || "";

export const renameColumn = (df: IDataFrame, years: string[], currentYear: string) => {
  const columns = df.getColumnNames();

  const currentColumnName = getEffectifColumnName(columns);
  const nextColumnName = getSiPsiColumnName(currentYear, years);

  return df.renameSeries({
    [currentColumnName]: nextColumnName
  });
}
