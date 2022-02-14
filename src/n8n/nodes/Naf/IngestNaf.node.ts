import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import {mapRow} from "../../utils/postgre";

const config: IngestDbConfig = {
  filename: "naf.csv",
  table: "naf",
  fieldsMapping: {
    "Code": "code",
    "Libellé": "libelle"
  },
  addedColumns: ["recherche", "nomenclature"],
  transform: () => mapRow((row: Record<string, string>) => ({
    ...row,
    recherche: true,
    nomenclature: "NAF rév. 2"
  })),
  truncate: true,
  separator: ","
};

export class IngestNaf implements INodeType {
  description: INodeTypeDescription = {
    displayName: "NAF Ingest",
    name: "naf",
    group: ['transform'],
    version: 1,
    description: "NAF Ingest",
    defaults: {
      name: 'NAF Ingest',
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
    return ingestDb(this, config)
  }
}
