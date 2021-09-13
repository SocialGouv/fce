import {ICSVOptions, IDataFrame, readFile} from "data-forge";
import "data-forge-fs";

export const mergeCsvDataFrame = (dataFrame1: IDataFrame, dataFrame2: IDataFrame, key: string): IDataFrame  => {
  const keySelector = (row: Record<string, string>) => row[key];
  return dataFrame1.joinOuter(
    dataFrame2,
    keySelector,
    keySelector,
    (row1, row2) => ({ ...row1, ...row2 })
  );
}

export const loadCsvDataframe = async (fileName: string, options?: ICSVOptions): Promise<IDataFrame<number, any>> =>
  readFile(fileName)
    .parseCSV(options);

export const mergeFiles = async (file1: string, file2: string, key: string, output: string) => {
  const df1 = await readFile(file1)
    .parseCSV();
  const df2 = await readFile(file2)
    .parseCSV();

  const dataSerializer = mergeCsvDataFrame(df1, df2, key);

  return dataSerializer.asCSV().writeFile(output);
}
