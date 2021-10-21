import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import {createPool, truncateTable} from "../../utils/postgre";

export class TruncateTable implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Truncate table",
    name: "truncateTable",
    group: ['transform'],
    version: 1,
    description: "Truncate a table in database",
    defaults: {
      name: 'Truncate table',
      color: '#772244',
    },
    credentials: [{
      name: "postgres",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
    properties: [{
      displayName: "Table name",
      name: "table",
      type: "string",
      default: "",
      description: "The name of the table to truncate",
      required: true
    }]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const tablename = this.getNodeParameter("table", 0) as string;
    const pool = await createPool(this);

    const client = await pool.connect();

    await truncateTable(client, tablename);

    return [this.helpers.returnJsonArray({})];
  }
}
