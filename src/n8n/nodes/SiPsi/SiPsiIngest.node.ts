import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { getFileType, getSiPsiFileDate, SiPsiKey } from "../../utils/siPsi";

type SiPsiParams = {
  key: string;
  columns: string[];
  filename: string;
  updateDate: string;
  truncate?: boolean;
  conflictQuery?: string;
};

const makeConfig = ({
  key,
  columns,
  filename,
  updateDate,
  truncate = false,
  conflictQuery,
}: SiPsiParams): IngestDbConfig => ({
  fieldsMapping: columns,
  filename,
  table: `psi_${key}`,
  truncate,
  separator: "\t",
  updateHistoryQuery: updateHistoryQuery(updateDate, `psi_${key}`),
  nonEmptyFields: [key],
  conflictQuery,
});

const updateHistoryQuery = (updateDate: string, table: string) =>
  `UPDATE import_updates SET date = '${updateDate}', date_import = CURRENT_TIMESTAMP WHERE "table"='${table}'`;

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

    const [previousYearFile, currentYearFile] = files.sort();

    const fileType = getFileType(files[0]);

    const previousYearColumns = [fileType, "salaries_annee_precedente"];

    const updateDate = getSiPsiFileDate(currentYearFile);

    await ingestDb(this, {
      ...makeConfig({
        key: fileType,
        columns: previousYearColumns,
        filename: previousYearFile,
        updateDate,
        truncate: true
      }),
    });

    const currentYearColumns = [fileType, "salaries_annee_courante"];

    return ingestDb(this, {
      ...makeConfig({
        key: fileType,
        columns: currentYearColumns,
        filename: currentYearFile,
        updateDate,
        conflictQuery: `(${fileType}) DO UPDATE SET salaries_annee_courante = EXCLUDED.salaries_annee_courante`,
      }),
    });
  }
}
