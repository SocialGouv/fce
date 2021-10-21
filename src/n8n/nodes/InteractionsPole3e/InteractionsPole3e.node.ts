import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { Transform } from "stream";
import { filterRows, mapRow } from "../../utils/postgre";
import pipe from "multipipe";
import {getDate, getMonth, isFuture, parse} from "date-fns";

const is31December = (date: Date) =>
  getDate(date) === 31 && getMonth(date) === 11;

const config: IngestDbConfig = {
  fieldsMapping: {
    "SIRET": "siret",
    "Date de la visite": "date_visite",
    "Région de l'utilisateur propriétaire de la visite": "region",
    "Visite effectuée par": "inspecteurs",
    "Filière(s) stratégique(s) - Tous les  libellés": "filieres",
    "Type de suivi": "type_suivi",
    "Type de suivi ETI/Pépite": "suivi_eti"
  },
  filename: "interactions_pole_3e.csv",
  table: "interactions_pole_3e",
  truncate: true,
  date: {
    field: "date_visite",
    inputFormat: "dd/MM/yyyy",
    outputFormat: "dd/MM/yyyy"
  },
  padSiret: true,
  generateSiren: true,
  transform: () => pipe(
    filterRows(
      (data: Record<string, string>) => {
        const date = parse(data.date_visite, "dd/MM/yyyy",new Date());

        return !is31December(date) && !isFuture(date);
      }
    ),
    mapRow((data: Record<string, string>) => {
      return {
        ...data,
        inspecteurs: data.inspecteurs.replace(/\r\n/, " "),
      }
    })
  ) as Transform
};

export class InteractionsPole3e implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Interactions Pole 3e Ingest",
    name: "interactionsPole3e",
    group: ['transform'],
    version: 1,
    description: "Interactions Pole 3e Ingestor",
    defaults: {
      name: 'Interactions Pole 3e Ingest',
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
