import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  filename: "nomenclature_idcc.csv",
  table: "idcc",
  fieldsMapping: {
    "TITRE DE LA CONVENTION": "libelle",
    "IDCC": "code",
  },
  separator: ",",
  truncate: true,
};

export class IngestIDCCNomenclature implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Nomenclature IDCC Ingest",
    name: "idccNomenclature",
    group: ['transform'],
    version: 1,
    description: "Nomenclature IDCC Ingest",
    defaults: {
      name: 'Nomenclature IDCC Ingest',
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
