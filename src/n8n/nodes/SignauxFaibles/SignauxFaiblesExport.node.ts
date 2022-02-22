import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import {createClient, stringifyCsv} from "../../utils/postgre";
import QueryStream from "pg-query-stream";
import {createWriteStream} from "fs";
import path from "path";
import {DOWNLOAD_STORAGE_PATH} from "../../utils/constants";
import {promisifyStream} from "../../utils/stream";

export class SignauxFaiblesExport implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Signaux Faibles Export",
    name: "signauxFaiblesExport",
    group: ['transform'],
    version: 1,
    description: "Generate an export file about controls for the Signaux Faibles startup ",
    defaults: {
      name: 'Signaux Faibles Export',
      color: '#772244',
    },
    credentials: [{
      name: "postgres",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
    properties: [{
      displayName: "Export file name",
      name: "exportFileName",
      type: "string",
      default: "signauxFaibles.csv",
      description: "The name of the generated export file",
      required: true
    }]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const client = await createClient(this);

    await client.connect();

    const outputFileName = this.getNodeParameter("exportFileName", 0) as string;


    const stream = client.query(
      new QueryStream(`SELECT i.siret FROM (
        SELECT siret FROM "interactions_pole_c"
        UNION SELECT siret FROM "interactions_pole_t"
        UNION SELECT siret FROM "interactions_pole_3e"
        UNION SELECT siret FROM "interactions_pole_3e_src"
      ) AS i`)
    );

    const outputStream = stream
      .pipe(stringifyCsv({ columns: ["siret"] }))
      .pipe(createWriteStream(path.join(DOWNLOAD_STORAGE_PATH, outputFileName)));

    await promisifyStream(outputStream);

    return [this.helpers.returnJsonArray({})]
  }
}
