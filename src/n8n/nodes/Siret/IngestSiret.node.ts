import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const fields = [
    "siren",
    "nic",
    "siret",
    "statutDiffusionEtablissement",
    "dateCreationEtablissement",
    "trancheEffectifsEtablissement",
    "anneeEffectifsEtablissement",
    "activitePrincipaleRegistreMetiersEtablissement",
    "dateDernierTraitementEtablissement",
    "etablissementSiege",
    "nombrePeriodesEtablissement",
    "complementAdresseEtablissement",
    "numeroVoieEtablissement",
    "indiceRepetitionEtablissement",
    "typeVoieEtablissement",
    "libelleVoieEtablissement",
    "codePostalEtablissement",
    "libelleCommuneEtablissement",
    "libelleCommuneEtrangerEtablissement",
    "distributionSpecialeEtablissement",
    "codeCommuneEtablissement",
    "codeCedexEtablissement",
    "libelleCedexEtablissement",
    "codePaysEtrangerEtablissement",
    "libellePaysEtrangerEtablissement",
    "complementAdresse2Etablissement",
    "numeroVoie2Etablissement",
    "indiceRepetition2Etablissement",
    "typeVoie2Etablissement",
    "libelleVoie2Etablissement",
    "codePostal2Etablissement",
    "libelleCommune2Etablissement",
    "libelleCommuneEtranger2Etablissement",
    "distributionSpeciale2Etablissement",
    "codeCommune2Etablissement",
    "codeCedex2Etablissement",
    "libelleCedex2Etablissement",
    "codePaysEtranger2Etablissement",
    "libellePaysEtranger2Etablissement",
    "dateDebut",
    "etatAdministratifEtablissement",
    "enseigne1Etablissement",
    "enseigne2Etablissement",
    "enseigne3Etablissement",
    "denominationUsuelleEtablissement",
    "activitePrincipaleEtablissement",
    "nomenclatureActivitePrincipaleEtablissement",
    "caractereEmployeurEtablissement",
];

const getConfig = (fileName: string): IngestDbConfig => ({
    fieldsMapping: fields.reduce((acc, value) => {
        acc[value] = value.toLowerCase();
        return acc;
    }, {} as Record<string, string>),
    filename: fileName,
    table: "etablissements",
    truncate: true,
    separator: ",",
    bypassConflictSafeInsert: true,
    sanitizeHtmlChars: false
});

export class IngestSiret implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Siret Ingest",
        name: "siretIngest",
        group: ['transform'],
        version: 1,
        description: "Ingest Siret data",
        defaults: {
            name: 'Ingest Siret',
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
                default: 'StockEtablissement_utf8/StockEtablissement_utf8.csv',
                placeholder: 'File name',
                description: 'The name of the csv file to ingest',
                required: true
            },
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const fileName = this.getNodeParameter('fileName', 0) as string;

        const config = getConfig(fileName);

        return ingestDb(this, config);
    }
}
