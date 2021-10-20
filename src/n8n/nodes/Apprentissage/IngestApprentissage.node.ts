import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { mapRow } from "../../utils/postgre";
import { parse } from "date-fns";
import { reformatDate } from "../../utils/date";

const INPUT_DATE_FORMAT = "dd/MM/yyyy";
const OUTPUT_DATE_FORMAT = "yyyy-MM-dd";

const config: IngestDbConfig = {
  fieldsMapping: {
    "Contrat DateDebut": "date_debut",
    "TypeContrat": "type_contrat",
    "NumeroEnregistrement": "numero_enregistrement",
    "Employeur Siret": "siret",
    "DateRupture": "date_rupture",
  },
  filename: "apprentissage.csv",
  table: "etablissements_apprentissage",
  truncate: true,
  separator: ";",
  date: {
    field: "date_debut",
    outputFormat: OUTPUT_DATE_FORMAT,
    inputFormat: INPUT_DATE_FORMAT
  },
  padSiret: true,
  generateSiren: true,
  nonEmptyFields: ["siret"],
  transform: () => mapRow((data: Record<string, string>) => ({
    ...data,
    date_rupture: data.date_rupture ? reformatDate(data.date_rupture, INPUT_DATE_FORMAT, OUTPUT_DATE_FORMAT) : "",
  })),
  bypassConflictSafeInsert: true,
};

export class IngestApprentissage implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Apprentissage Ingest",
    name: "apprentissageIngest",
    group: ['transform'],
    version: 1,
    description: "Ingest apprentissage data",
    defaults: {
      name: 'Ingest apprentissage',
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
