import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { formatISO } from "date-fns";
import * as path from "path";
import {getFileType, getFileYear, getSiPsiFileDate, renameColumn, SiPsiKey} from "../../utils/siPsi";
import {DOWNLOAD_STORAGE_PATH} from "../../utils/constants";
import {loadCsvDataframe, mergeCsvDataFrame} from "../../utils/csv";
import { promises as fs } from "fs";
import {mapRow} from "../../utils/postgre";

type SiPsiParams = {
  key: SiPsiKey;
  filename: string;
  updateDate: string;
};

type FieldsMappingOptions = {
  key: SiPsiKey;
};

const getFieldsMapping = ({ key }: FieldsMappingOptions): Record<string, string> => ({
  [key]: key,
  salaries_annee_courante: "salaries_annee_courante",
  salaries_annee_precedente: "salaries_annee_precedente"
});

const makeConfig = ({
  key,
  filename,
  updateDate
}: SiPsiParams): IngestDbConfig => ({
  fieldsMapping: getFieldsMapping({ key }),
  filename,
  table: `psi_${key}`,
  truncate: true,
  separator: ",",
  updateHistoryQuery: updateHistoryQuery(updateDate, key),
  nonEmptyFields: [key],
});

const updateHistoryQuery = (updateDate: string, key: SiPsiKey) =>
  `UPDATE import_updates SET date = '${updateDate}', date_import = CURRENT_TIMESTAMP WHERE "table"='psi_${key}'`;

export class SiPsiIngest implements INodeType {
  description: INodeTypeDescription = {
    displayName: "SI PSI Ingest",
    name: "siPsi",
    group: ['transform'],
    version: 1,
    description: "Si PSI Ingestor",
    defaults: {
      name: 'Si PSI Ingest',
      color: '#772244',
    },
    credentials: [{
      name: "postgres",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
    properties: [{
      displayName: "Files",
      name: "files",
      type: "string",
      default: "",
      description: "The output file of minio download",
      required: true
    }]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const files: string[] = JSON.parse(this.getNodeParameter("files", 0) as string);

    if (files[0] === "" || files[1] === "") {
      return [this.helpers.returnJsonArray({})];
    }

    const years = files.map(getFileYear);

    const filePaths = files.map(filename => path.join(DOWNLOAD_STORAGE_PATH, filename));

    const df0 = await loadCsvDataframe(filePaths[0]);
    const df1 = await loadCsvDataframe(filePaths[1]);

    let sanitizedDf0 = renameColumn(df0, years, years[0])
    let sanitizedDf1 = renameColumn(df1, years, years[1])

    const fileType = getFileType(files[0]);
    const updateDate = getSiPsiFileDate(filePaths[0]);

    const isSiren = fileType === "siren";

    sanitizedDf0 = isSiren ? sanitizedDf0.renameSeries({ client_siren: "siren" }) : sanitizedDf0;
    sanitizedDf1 = isSiren ? sanitizedDf1.renameSeries({ client_siren: "siren" }) : sanitizedDf1;

    const mergedDataFrame = mergeCsvDataFrame(sanitizedDf0, sanitizedDf1, fileType);

    const tmpCsvName = `tmp_${fileType}_${updateDate}.csv`;

    const tempCsvPath = path.join(DOWNLOAD_STORAGE_PATH, tmpCsvName);

    await mergedDataFrame.asCSV().writeFile(tempCsvPath);

    const result = await ingestDb(this, {
      ...makeConfig({ key: fileType, filename: tmpCsvName, updateDate }),
    });

    await fs.unlink(tempCsvPath);

    return result;
  }
}
