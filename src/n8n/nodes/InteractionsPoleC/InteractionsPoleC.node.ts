import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { mapRow } from "../../utils/postgre";

const monthMap: Record<string, string> = {
  ja: "01",
  f: "02",
  mar: "03",
  av: "04",
  mai: "05",
  juin: "06",
  juil: "07",
  ao: "08",
  s: "09",
  o: "10",
  n: "11",
  d: "12"
};

// Month is poorly encoded french month names, so we need to use a trick to detect it
const getMonth = (monthText: string) => {
  const monthKey = Object.keys(monthMap).find(key => monthText.startsWith(key)) || "";
  return monthMap[monthKey];
}

const config: IngestDbConfig = {
  fieldsMapping: {
    "Etob Siret": "siret",
    "Année de Visite Date Intervention": "annee",
    "Mois de Visite Date Intervention": "mois",
    "Jour de Visite Date Intervention": "jour",
    "Suite (1 = oui, 0 = non)": "suite",
    "Unfct Libelle": "unite",
    "Messagerie": "messagerie"
  },
  filename: "interactions_pole_c.csv",
  table: "interactions_pole_c",
  truncate: true,
  padSiret: true,
  generateSiren: true,
  separator: ",",
  addedColumns: ["date"],
  transform: () => mapRow((row: Record<string, string>) => {
    const date = `${row.annee}-${getMonth(row.mois)}-${row.jour}`;

    return ({
      ...row,
      date
    });
  })
};

export class InteractionsPoleC implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Interactions Pole C Ingest",
    name: "interactionsPoleC",
    group: ['transform'],
    version: 1,
    description: "Interactions Pole C Ingestor",
    defaults: {
      name: 'Interactions Pole C Ingest',
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
