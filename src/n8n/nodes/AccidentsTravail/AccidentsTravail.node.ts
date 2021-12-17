import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { createPool } from "../../utils/postgre";

const config: IngestDbConfig = {
  fieldsMapping: {
    "01_SIRET": "siret",
    "02_nb_at_total": "total",
    "03_nb_at_mortels": "mortels",
    "04_nb_at_avec_arret_travail": "avec_arret_travail",
    "05_nb_at_sans_arret_travail": "sans_arret_travail",
    "06_NAF_NIV1": "code_naf_niv1",
    "07_nb_at_pour_1000salaries": "pour_1000",
    "08_nb_at_pour_1000sal_france_secteur": "pour_1000_secteur_national",
    "09_nb_at_pour_1000sal_region_secteur": "pour_1000_secteur_regional"
  },
  filename: "DAT-nb-at-par-SIRET.csv",
  table: "accidents_travail",
  truncate: true,
  separator: ";",
  generateSiren: true,
};

export class AccidentsTravail implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Accidents du travail Ingest",
    name: "accidentsTravail",
    group: ['transform'],
    version: 1,
    description: "Accidents du travail Ingestor",
    defaults: {
      name: 'Accidents du travail Ingest',
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
    const pool = await createPool(this);

    const result = await ingestDb(this, config, pool);

    return result;
  }
}
