import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import {mapRow} from "../../utils/postgre";

const config: IngestDbConfig = {
  filename: "etablissements_idcc.csv",
  table: "etablissements_idcc",
  fieldsMapping: {
    "MOIS": "mois",
    "DATE_MAJ": "date_maj",
    "IDCC": "idcc",
    "SIRET": "siret",
  },
  separator: ",",
  truncate: true,
  generateSiren: true,
  transform: () => mapRow((row: Record<string, string>) => ({
    ...row,
    idcc: row.idcc.trim(),
  })),
  padSiret: true
};

export class IngestIDCCEtablissement implements INodeType {
  description: INodeTypeDescription = {
    displayName: "IDCC Etablissement Ingest",
    name: "idccEtablissement",
    group: ['transform'],
    version: 1,
    description: "IDCC Etablissement Ingest",
    defaults: {
      name: 'IDCC Etablissement Ingest',
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
