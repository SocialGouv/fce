import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  filename: "cateogries_juridiques.csv",
  table: "categorie_juridique",
  fieldsMapping: {
    "Code": "code",
    "Libellé": "libelle"
  },
  separator: ","
};

export class CategoriesJuridiquesIngest implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Categories Juridiques Ingest",
    name: "categoriesJuridiques",
    group: ['transform'],
    version: 1,
    description: "Categories Juridiques Ingest",
    defaults: {
      name: 'Categories Juridiques Ingest',
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
