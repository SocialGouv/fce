import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const fields = [
    "siren",
    "statutDiffusionUniteLegale",
    "unitePurgeeUniteLegale",
    "dateCreationUniteLegale",
    "sigleUniteLegale",
    "sexeUniteLegale",
    "prenom1UniteLegale",
    "prenom2UniteLegale",
    "prenom3UniteLegale",
    "prenom4UniteLegale",
    "prenomUsuelUniteLegale",
    "pseudonymeUniteLegale",
    "identifiantAssociationUniteLegale",
    "trancheEffectifsUniteLegale",
    "anneeEffectifsUniteLegale",
    "dateDernierTraitementUniteLegale",
    "nombrePeriodesUniteLegale",
    "categorieEntreprise",
    "anneeCategorieEntreprise",
    "dateDebut",
    "etatAdministratifUniteLegale",
    "nomUniteLegale",
    "nomUsageUniteLegale",
    "denominationUniteLegale",
    "denominationUsuelle1UniteLegale",
    "denominationUsuelle2UniteLegale",
    "denominationUsuelle3UniteLegale",
    "categorieJuridiqueUniteLegale",
    "activitePrincipaleUniteLegale",
    "nomenclatureActivitePrincipaleUniteLegale",
    "nicSiegeUniteLegale",
    "economieSocialeSolidaireUniteLegale",
    "caractereEmployeurUniteLegale",
];

const config: IngestDbConfig = {
    fieldsMapping: fields.reduce((acc, value) => {
        acc[value] = value.toLowerCase();
        return acc;
    }, {} as Record<string, string>),
    filename: "StockUniteLegale_utf8/StockUniteLegale_utf8.csv",
    table: "entreprises",
    truncate: true,
    separator: ",",
    bypassConflictSafeInsert: true,
    sanitizeHtmlChars: false
};

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
        properties: []
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        return ingestDb(this, config);
    }
}
