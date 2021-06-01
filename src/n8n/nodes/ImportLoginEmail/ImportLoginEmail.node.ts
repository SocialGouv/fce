import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  fieldsMapping: {
    "Courriel": "email",
    "Structure": "structure"
  },
  filename: "valid_emails.csv",
  table: "valid_email",
  truncate: true,
  nonEmptyFields: ["email"],
  separator: ","
};

export class ImportLoginEmail implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Import Login Email",
    name: "importLoginEmail",
    group: ['transform'],
    version: 1,
    description: "Import whitelisted emails for connection",
    defaults: {
      name: 'Import Login Email',
      color: '#772244',
    },
    credentials: [{
      name: "postgres",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
    properties: []
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return ingestDb(this, config);
  }
}
