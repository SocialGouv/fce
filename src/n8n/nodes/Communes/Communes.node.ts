import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { createPool, mapRow } from "../../utils/postgre";
import { Transform } from "stream";

const config: IngestDbConfig = {
  fieldsMapping: {
    "Code_commune_INSEE": "code_insee",
    "Nom_commune": "nom",
    "Code_postal": "code_postal",
  },
  addedColumns: ["lattitude", "longitude"],
  filename: "laposte_hexasmal.csv",
  table: "communes",
  truncate: true,
  separator: ";",
  transform: () => mapRow(({ coordonnees_gps, ...rest }: Record<string, string>) => {
    if (!coordonnees_gps) return rest;

    const [lattitude, longitude] = coordonnees_gps.split(",");

    return {
      ...rest,
      lattitude,
      longitude,
    };
  }) as Transform,
};

export class Communes implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Communes Ingest",
    name: "communes",
    group: ["transform"],
    version: 1,
    description: "Communes Ingestor",
    defaults: {
      name: "Communes Ingest",
      color: "#772244",
    },
    credentials: [{
      name: "postgres",
      required: true
    }],
    inputs: ["main"],
    outputs: ["main"],
    properties: []
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const pool = await createPool(this);

    const result = await ingestDb(this, config, pool);

    return result;
  }
}
