import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  fieldsMapping: {
    "NUMERO DE DOSSIER": "numero",
    "TYPE DE DOSSIER": "type",
    "DATE ENREGISTREMENT": "date_enregistrement",
    "ETAT DU DOSSIER":"etat",
    "SIREN ENTREPRISE": "siren",
    "EFFECTIF ENTREPRISE": "effectif_entreprise",
    "EFFECTIF GROUPE": "effectif_groupe",
    "NOM GROUPE": "nom_groupe",
    "DATE JUGEMENT": "date_jugement",
    "SITUATION JURIDIQUE": "situation_juridique"
  },
  filename: "rupco_procedures.csv",
  table: "rupco_procedures",
  truncate: true,
  replaceHtmlChars: true,
  date: {
    field: "date_enregistrement",
    outputFormat: "yyyy-MM-dd",
  },
  padSiren: true,
  truncateRequest: "DELETE FROM rupco_procedures WHERE historique_si = FALSE OR date_enregistrement IS NULL",
  deduplicateField: "numero",
  nonEmptyFields: ["numero"]
};

export class RupcoProcedureIngest implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Rupco Procedure Ingest",
    name: "rupcoProcedureIngest",
    group: ['transform'],
    version: 1,
    description: "Rupco Procedure Ingest",
    defaults: {
      name: 'Rupco Procedure Ingest',
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
