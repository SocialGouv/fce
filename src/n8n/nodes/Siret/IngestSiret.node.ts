import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const fieldsMapping = {
  "eta_siren": "siren",
  "eta_nic": "nic",
  "eta_siret": "siret",
  "eta_statutDiffusionEtablissement": "statutDiffusionEtablissement",
  "eta_dateCreationEtablissement": "dateCreationEtablissement",
  "eta_trancheEffectifsEtablissement": "trancheEffectifsEtablissement",
  "eta_anneeEffectifsEtablissement": "anneeEffectifsEtablissement",
  "eta_activitePrincipaleRegistreMetiersEtablissement": "activitePrincipaleRegistreMetiersEtablissement",
  "eta_dateDernierTraitementEtablissement": "dateDernierTraitementEtablissement",
  "eta_etablissementSiege": "etablissementSiege",
  "eta_nombrePeriodesEtablissement": "nombrePeriodesEtablissement",
  "eta_complementAdresseEtablissement": "complementAdresseEtablissement",
  "eta_numeroVoieEtablissement": "numeroVoieEtablissement",
  "eta_indiceRepetitionEtablissement": "indiceRepetitionEtablissement",
  "eta_typeVoieEtablissement": "typeVoieEtablissement",
  "eta_libelleVoieEtablissement": "libelleVoieEtablissement",
  "eta_codePostalEtablissement": "codePostalEtablissement",
  "eta_libelleCommuneEtablissement": "libelleCommuneEtablissement",
  "eta_libelleCommuneEtrangerEtablissement": "libelleCommuneEtrangerEtablissement",
  "eta_distributionSpecialeEtablissement": "distributionSpecialeEtablissement",
  "eta_codeCommuneEtablissement": "codeCommuneEtablissement",
  "eta_codeCedexEtablissement": "codeCedexEtablissement",
  "eta_libelleCedexEtablissement": "libelleCedexEtablissement",
  "eta_codePaysEtrangerEtablissement": "codePaysEtrangerEtablissement",
  "eta_libellePaysEtrangerEtablissement": "libellePaysEtrangerEtablissement",
  "eta_complementAdresse2Etablissement": "complementAdresse2Etablissement",
  "eta_numeroVoie2Etablissement": "numeroVoie2Etablissement",
  "eta_indiceRepetition2Etablissement": "indiceRepetition2Etablissement",
  "eta_typeVoie2Etablissement": "typeVoie2Etablissement",
  "eta_libelleVoie2Etablissement": "libelleVoie2Etablissement",
  "eta_codePostal2Etablissement": "codePostal2Etablissement",
  "eta_libelleCommune2Etablissement": "libelleCommune2Etablissement",
  "eta_libelleCommuneEtranger2Etablissement": "libelleCommuneEtranger2Etablissement",
  "eta_distributionSpeciale2Etablissement": "distributionSpeciale2Etablissement",
  "eta_codeCommune2Etablissement": "codeCommune2Etablissement",
  "eta_codeCedex2Etablissement": "codeCedex2Etablissement",
  "eta_libelleCedex2Etablissement": "libelleCedex2Etablissement",
  "eta_codePaysEtranger2Etablissement": "codePaysEtranger2Etablissement",
  "eta_libellePaysEtranger2Etablissement": "libellePaysEtranger2Etablissement",
  "eta_dateDebut": "dateDebut",
  "eta_etatAdministratifEtablissement": "etatAdministratifEtablissement",
  "eta_enseigne1Etablissement": "enseigne1Etablissement",
  "eta_enseigne2Etablissement": "enseigne2Etablissement",
  "eta_enseigne3Etablissement": "enseigne3Etablissement",
  "eta_denominationUsuelleEtablissement": "denominationUsuelleEtablissement",
  "eta_activitePrincipaleEtablissement": "activitePrincipaleEtablissement",
  "eta_nomenclatureActivitePrincipaleEtablissement": "nomenclatureActivitePrincipaleEtablissement",
  "eta_caractereEmployeurEtablissement": "caractereEmployeurEtablissement",
};

const getConfig = (fileName: string): IngestDbConfig => ({
    fieldsMapping,
    filename: fileName,
    table: "etablissements",
    truncate: true,
    separator: ",",
    bypassConflictSafeInsert: true,
    sanitizeHtmlChars: false,
    nonEmptyFields: ["siren", "siret"],
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
