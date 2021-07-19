import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  fieldsMapping: {
    "SIRET": "siret",
    "NUM_CONVENTION": "num_convention",
    "DATE_DECISION": "date_decision",
    "NUM_AVENANT": "num_avenant",
    "DA_INIT": "da_init",
    "NB_H_AUTO_AVN": "nb_h_auto_avn",
    "NB_H_AUTO_CUM": "nb_h_auto_cum",
    "NB_H_CONSO_CUM": "nb_h_conso_cum",
    "CAUSE": "cause",
  },
  filename: "etablissements_activite_partielle.csv",
  table: "etablissements_activite_partielle",
  truncate: true,
  replaceHtmlChars: true,
  date: {
    field: "date_decision",
    format: "YYYY-MM-DD",
  },
  generateSiren: true,
  nonEmptyFields: ["siret"],
};

export class ActivitePartielleEtablissement implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Activite Partielle Etablissement Ingest",
    name: "activitePartielleEtablissementIngest",
    group: ['transform'],
    version: 1,
    description: "Activite Partielle Etablissement Ingest",
    defaults: {
      name: 'Activite Partielle Etablissement Ingest',
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
