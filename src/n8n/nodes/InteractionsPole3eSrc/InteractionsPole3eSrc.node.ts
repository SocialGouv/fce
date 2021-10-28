import pipe from "multipipe";
import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { createPool, filterRows, mapRow } from "../../utils/postgre";
import { Transform } from "stream";

const config: IngestDbConfig = {
  fieldsMapping: {
    "Numero dossier": "numero_dossier",
    "N° SIREN": "siren",
    "N° Etablissement": "numero_etablissement",
    "Code region": "region",
    "Libelle region": "libelle_region",
    "Type de contrôle": "type_controle",
    "Date creation": "date_creation",
    "Date derniere Modification": "date",
    "Date cloture": "date_cloture",
    "Cols": "clos",
    "Clos automatiquement": "clos_automatiquement",
    "Nature du contrôle": "nature_controle",
    "Cible du contrôle": "cible_controle"
  },
  addedColumns: ["siret"],
  filename: "interactions_pole_3e_src.csv",
  table: "interactions_pole_3e_src",
  truncate: true,
  separator: ",",
  date: {
    field: "date",
    outputFormat: "dd/MM/yyyy"
  },
  transform: () => pipe(
    filterRows((row) => +row.siren !== 0),
    mapRow(({ siren, numero_etablissement, ...rest }: Record<string, string>) => ({
      ...rest,
      siren,
      numero_etablissement,
      siret: numero_etablissement ? `${siren}${numero_etablissement}` : ""
    }))
  ) as Transform,
  encoding: "windows-1252",
};

export class InteractionsPole3eSrc implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Interactions Pole 3e SRC Ingest",
    name: "interactionsPole3eSrc",
    group: ['transform'],
    version: 1,
    description: "Interactions Pole 3e SRC Ingestor",
    defaults: {
      name: 'Interactions Pole 3e SRC Ingest',
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

    const query = `UPDATE ${config.table}
      SET siret =
        CASE
          WHEN siret IS NULL
          THEN concat(siren, (
              SELECT nicsiegeunitelegale
              FROM entreprises
              WHERE ${config.table}.siren = entreprises.siren
              LIMIT 1
            )
          )
          ELSE siret
        END;
      `;

    await pool.query(query);

    return result;
  }
}
