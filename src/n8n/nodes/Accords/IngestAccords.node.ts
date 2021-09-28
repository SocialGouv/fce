import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const config: IngestDbConfig = {
  fieldsMapping: {
    "num_dos": "num_dos",
    "siret": "siret",
    "dt_sign": "dt_sign",
    "groth2_01_epargne_salariale": "epargne",
    "groth2_02_remuneration": "remuneration",
    "groth2_03_duree_amenagement_temps_travail": "temps_travail",
    "groth2_04_conditions_travail": "conditions_travail",
    "groth2_05_emploi": "emploi",
    "groth2_06_egalite_professionnelle": "egalite_pro",
    "groth2_07_classifications": "classifications",
    "groth2_08_formation_professionnelle": "formation",
    "groth2_09_protection_sociale": "protection_sociale",
    "groth2_10_droit_syndical": "droit_syndical",
    "groth2_11_autres": "autres",
    "groth2_12_nouvelles_technos_numeriques": "nouvelles_technologies",
  },
  filename: "accords.csv",
  table: "etablissements_accords",
  truncate: true,
  date: {
    field: "dt_sign",
    outputFormat: "yyyy-MM-dd",
  },
  generateSiren: true,
  nonEmptyFields: ["siret"],
};

export class IngestAccords implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Accords Ingest",
    name: "accordsIngest",
    group: ['transform'],
    version: 1,
    description: "Ingest accords d'entreprise",
    defaults: {
      name: 'Accords Ingest',
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
