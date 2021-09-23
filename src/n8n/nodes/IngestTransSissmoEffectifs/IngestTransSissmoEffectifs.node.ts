import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

type ConfigOptions = {
  isLatestUpdate: boolean,
};

const config = ({ isLatestUpdate }: ConfigOptions): IngestDbConfig => ({
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
  table: isLatestUpdate ? "etablissements_dsn_eff" : "etablissements_dsn_effectif",
  truncate: isLatestUpdate,
  separator: ",",
  date: {
    field: "date_maj",
    outputFormat: "yyyy/MM/dd",
  },
  padSiret: true,
  nonEmptyFields: ["siret"],
  bypassConflictSafeInsert: true,
});

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
    properties: [{
      displayName: 'Latest update',
      name: 'latestUpdate',
      type: 'boolean',
      default: false,
      description: 'Check if the ingest is the latest file',
    }]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const isLatestUpdate = this.getNodeParameter("latestUpdate", 0, false) as boolean;
    return ingestDb(this, config({
      isLatestUpdate
    }));
  }
}
