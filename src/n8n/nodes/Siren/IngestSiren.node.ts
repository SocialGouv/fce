import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { mapValues } from "lodash";
import {filterRows} from "../../utils/postgre";

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
  ent_caractereEmployeurUniteLegale: "caractereEmployeurUniteLegale",
}

const getConfig = (filename: string, tempFile: boolean): IngestDbConfig => ({
    fieldsMapping: mapValues(fieldsMapping, v => v.toLowerCase()),
    filename,
    table: "entreprises",
    truncate: true,
    separator: ",",
    bypassConflictSafeInsert: true,
    sanitizeHtmlChars: false,
    label: "Ingest Siren",
    nonEmptyFields: ["siren"],
    transform: () => filterRows((row) => row.eta_etablissementSiege === "true"),
    createTemporaryFile: tempFile
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
            displayName: 'Create temporary file',
            name: "tempFile",
            type: "boolean",
            default: false,
            description: "Whether an intermediate file should be created on the server. Used for debugging."
          }
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const fileName = this.getNodeParameter('fileName', 0) as string;
        const tempFile = this.getNodeParameter('tempFile', 0) as boolean;

        const config = getConfig(fileName, tempFile);

        return ingestDb(this, config);
    }
}
