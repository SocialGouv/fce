import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { findWikitUcByCode } from "../../utils/wikitUc";
import { Transform } from "stream";
import { DOWNLOAD_STORAGE_PATH } from "../../utils/constants";
import * as path from "path";

const config: IngestDbConfig = {
  fieldsMapping: {
    "Siret": "siret",
    "Date de dernier controle": "date",
    "Propriétaire": "realise_pour",
  },
  filename: "interactions_pole_t.csv",
  table: "interactions_pole_t",
  truncate: true,
  date: {
    field: "date",
    inputFormat: "dd/MM/yyyy",
    outputFormat: "dd/MM/yyyy"
  },
  padSiret: true,
  generateSiren: true,
};

export class InteractionsPoleT implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Interactions Pole T Ingest",
    name: "interactionsPoleT",
    group: ['transform'],
    version: 1,
    description: "Interactions Pole T Ingestor",
    defaults: {
      name: 'Interactions Pole T Ingest',
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
    const wikitUcData = require(path.join(DOWNLOAD_STORAGE_PATH, "wikit_uc.json"));

    const transform = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        const wikitUc = findWikitUcByCode(wikitUcData.UC, chunk.realise_pour)
        this.push({
          ...chunk,
          intervenant: wikitUc ? wikitUc.LIB_UC : "",
          realise_pour: wikitUc ? wikitUc["Courrier électronique"] : chunk.realise_pour
        });
        callback();
      }
    });

    return ingestDb(this, {
      ...config,
      transform
    });
  }
}
