import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  fieldsMapping: {
    "NUMERO DE DOSSIER": "numero",
    "TYPE DE DOSSIER": "type",
    "DATE ENREGISTREMENT": "date_enregistrement",
    "SIREN ENTREPRISE": "siren",
    "DATE JUGEMENT": "date_jugement",
    "SITUATION JURIDIQUE": "situation_juridique",
    "SIREN ETABLISSEMENT": "siren_etablissement",
    "EFFECTIF ETABLISSEMENT": "effectif_etablissement",
    "SIRET ETABLISSEMENT": "siret",
    "Nombre de Ruptures de Contrats en début de procédure Etab": "nombre_de_ruptures_de_contrats_en_debut_de_procedure",
    "Nombre de Ruptures de Contrats en fin de procédure Etab": "nombre_de_ruptures_de_contrats_en_fin_de_procedure"
  },
  filename: "rupco_etablissements.csv",
  table: "rupco_etablissements",
  truncate: true,
  replaceHtmlChars: true,
  date: {
    field: "date_enregistrement",
    format: "YYYY-MM-DD",
  },
  padSiren: true,
  truncateRequest: "DELETE FROM rupco_etablissements WHERE historique_si = FALSE OR date_enregistrement IS NULL",
  nonEmptyFields: ["numero"],
};

export class RupcoEtablissementIngest implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Rupco Etablissement Ingest",
    name: "rupcoEtablissementIngest",
    group: ['transform'],
    version: 1,
    description: "Rupco Etablissement Ingest",
    defaults: {
      name: 'Rupco Etablissement Ingest',
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
