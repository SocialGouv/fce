import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { mapValues } from "lodash";
import { createReadStream } from "fs";
import path from "path";
import { DOWNLOAD_STORAGE_PATH } from "../../utils/constants";
import { createClient, downloadFile, getCredentialsFromContext } from "../../utils/azure";

const fieldsMapping = {
  ent_siren: "siren",
  ent_statutDiffusionUniteLegale: "statutDiffusionUniteLegale",
  ent_unitePurgeeUniteLegale: "unitePurgeeUniteLegale",
  ent_dateCreationUniteLegale: "dateCreationUniteLegale",
  ent_sigleUniteLegale: "sigleUniteLegale",
  ent_sexeUniteLegale: "sexeUniteLegale",
  ent_prenom1UniteLegale: "prenom1UniteLegale",
  ent_prenom2UniteLegale: "prenom2UniteLegale",
  ent_prenom3UniteLegale: "prenom3UniteLegale",
  ent_prenom4UniteLegale: "prenom4UniteLegale",
  ent_prenomUsuelUniteLegale: "prenomUsuelUniteLegale",
  ent_pseudonymeUniteLegale: "pseudonymeUniteLegale",
  ent_identifiantAssociationUniteLegale: "identifiantAssociationUniteLegale",
  ent_trancheEffectifsUniteLegale: "trancheEffectifsUniteLegale",
  ent_anneeEffectifsUniteLegale: "anneeEffectifsUniteLegale",
  ent_dateDernierTraitementUniteLegale: "dateDernierTraitementUniteLegale",
  ent_nombrePeriodesUniteLegale: "nombrePeriodesUniteLegale",
  ent_categorieEntreprise: "categorieEntreprise",
  ent_anneeCategorieEntreprise: "anneeCategorieEntreprise",
  ent_dateDebut: "dateDebut",
  ent_etatAdministratifUniteLegale: "etatAdministratifUniteLegale",
  ent_nomUniteLegale: "nomUniteLegale",
  ent_nomUsageUniteLegale: "nomUsageUniteLegale",
  ent_denominationUniteLegale: "denominationUniteLegale",
  ent_denominationUsuelle1UniteLegale: "denominationUsuelle1UniteLegale",
  ent_denominationUsuelle2UniteLegale: "denominationUsuelle2UniteLegale",
  ent_denominationUsuelle3UniteLegale: "denominationUsuelle3UniteLegale",
  ent_categorieJuridiqueUniteLegale: "categorieJuridiqueUniteLegale",
  ent_activitePrincipaleUniteLegale: "activitePrincipaleUniteLegale",
  ent_nomenclatureActivitePrincipaleUniteLegale: "nomenclatureActivitePrincipaleUniteLegale",
  ent_nicSiegeUniteLegale: "nicSiegeUniteLegale",
  ent_economieSocialeSolidaireUniteLegale: "economieSocialeSolidaireUniteLegale",
  ent_caractereEmployeurUniteLegale: "caractereEmployeurUniteLegale"
}

const getConfig = (filename: string, inputStream: (filename: string) => NodeJS.ReadableStream): IngestDbConfig => ({
    fieldsMapping: mapValues(fieldsMapping, v => v.toLowerCase()),
    filename,
    table: "entreprises",
    truncate: true,
    separator: ",",
    bypassConflictSafeInsert: true,
    sanitizeHtmlChars: false,
    inputStream,
    deduplicateField: "siren",
    label: "Ingest Siren"
});

export class IngestSiren implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Siren Ingest",
        name: "sirenIngest",
        group: ['transform'],
        version: 1,
        description: "Ingest Siren data",
        defaults: {
            name: 'Ingest Siren',
            color: '#772244',
        },
        credentials: [{
            name: "azure",
            required: true
        }, {
          name: "postgres",
          required: true
        }],
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'File name',
                name: 'fileName',
                type: 'string',
                default: 'StockUniteLegale_utf8/StockUniteLegale_utf8.csv',
                placeholder: 'File name',
                description: 'The name of the csv file to ingest',
                required: true
            },
            {
              displayName: 'Source',
              name: 'source',
              type: 'options',
              default: 'azure',
              options: [
                {
                  name: "Azure",
                  value: "azure"
                },
                {
                  name: "Local",
                  value: "local"
                }
              ],
              description: 'The type of source you want to use',
              required: true
            },
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const fileName = this.getNodeParameter('fileName', 0) as string;
        const source = this.getNodeParameter('source', 0) as string;

        let createInputStream: () => NodeJS.ReadableStream;

        if (source === "azure") {
          const { connectionString, shareName } = await getCredentialsFromContext(this);

          const client = createClient(connectionString);

          const downloader = downloadFile(client, shareName);

          const fileStream = await downloader(fileName);

          createInputStream = () => fileStream;
        } else {
          createInputStream = () => createReadStream(path.join(DOWNLOAD_STORAGE_PATH, fileName));
        }

        const config = getConfig(fileName, createInputStream);

        return ingestDb(this, config);
    }
}
