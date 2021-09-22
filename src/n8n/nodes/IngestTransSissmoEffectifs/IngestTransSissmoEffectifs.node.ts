import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  fieldsMapping: {
    "MOIS": "mois",
    "SIRET": "siret",
    "EFF_TOTAL": "eff",
    "EFF_HOMME": "hommes",
    "EFF_FEMME": "femmes",
    "NB_CDD": "cdd",
    "NB_CDI": "cdi",
    "NB_CDI_INTER": "cdi_inter",
    "NB_INTER_MISSION": "inter_mission",
    "NB_INTERIM": "interim",
    "DATE_MAJ": "date_maj",
  },
  filename: "ts_effectifs.csv",
  table: "etablissements_dsn_effectif",
  truncate: false,
  separator: ",",
  date: {
    field: "date_maj",
    outputFormat: "yyyy/MM/dd",
  },
  padSiret: true,
  nonEmptyFields: ["siret"],
  bypassConflictSafeInsert: true,
};

export class IngestTransSissmoEffectifs implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Trans sissmo Effectifs Ingest",
    name: "tsEffectifsIngest",
    group: ['transform'],
    version: 1,
    description: "Trans sissmo Effectifs Ingest",
    defaults: {
      name: 'Trans sissmo Effectifs Ingest',
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
