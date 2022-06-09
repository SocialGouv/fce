import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { getColumnsMapping, getFileType, getFileYear, getSiPsiFileDate,} from "../../utils/siPsi";
import { parse, format } from "date-fns";

type SiPsiParams = {
  key: string;
  columns: string[] | Record<string, string>;
  filename: string;
  updateDate: string;
  truncate?: boolean;
  conflictQuery?: string;
  keepConstraints?: boolean;
};

const makeConfig = ({
  key,
  columns,
  filename,
  updateDate,
  truncate = false,
  conflictQuery,
  keepConstraints
}: SiPsiParams): IngestDbConfig => ({
  fieldsMapping: columns,
  filename,
  table: `psi_${key}`,
  truncate,
  separator: ",",
  updateHistoryQuery: updateHistoryQuery(updateDate, `psi_${key}`),
  nonEmptyFields: [key],
  conflictQuery,
  keepConstraints
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
    const previousYear = +getFileYear(previousYearFile);

    const updateDate = format(parse(`${previousYear + 1}`, "yyyy", new Date()), "yyyy-MM-dd");

    console.log(updateDate);

    await ingestDb(this, makeConfig({
      key: fileType,
      columns: getColumnsMapping(fileType, previousYear, false),
      filename: previousYearFile,
      updateDate,
      truncate: true
    }));

    console.log(getColumnsMapping(fileType, previousYear + 1, true));

    return ingestDb(this, {
      ...makeConfig({
        key: fileType,
        columns: getColumnsMapping(fileType, previousYear + 1, true),
        filename: currentYearFile,
        updateDate,
        conflictQuery: `(${fileType}) DO UPDATE SET salaries_annee_courante = EXCLUDED.salaries_annee_courante`,
        keepConstraints: true
      }),
    });
  }
}
