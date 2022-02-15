import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";
import { mapRow } from "../../utils/postgre";
import { Transform } from "stream";

const fieldsMapping = {
  "siren": "siren",
  "siretEtablissementDeclarant": "siret",
  "numeroDeclarationActivite": "numero_declaration_activite",
  "denomination": "denomination",
  "certifications.actionsDeFormation": "actions_de_formation",
  "certifications.bilansDeCompetences": "bilans_de_competences",
  "certifications.VAE": "vae",
  "certifications.actionsDeFormationParApprentissage": "actions_de_formation_par_apprentissage",
  "organismeEtrangerRepresente.denomination": "organisme_etranger_represente_denomination",
  "informationsDeclarees.specialitesDeFormation.codeSpecialite1": "code_specialite_1",
  "informationsDeclarees.specialitesDeFormation.libelleSpecialite1": "libelle_specialite_1",
  "informationsDeclarees.specialitesDeFormation.codeSpecialite2": "code_specialite_2",
  "informationsDeclarees.specialitesDeFormation.libelleSpecialite2": "libelle_specialite_2",
  "informationsDeclarees.specialitesDeFormation.codeSpecialite3": "code_specialite_3",
  "informationsDeclarees.specialitesDeFormation.libelleSpecialite3": "libelle_specialite_3",
  "informationsDeclarees.nbStagiaires": "nb_stagiaires",
  "informationsDeclarees.nbStagiairesConfiesParUnAutreOF": "nb_stagiaires_confies_par_un_autre_of",
  "informationsDeclarees.effectifFormateurs": "effectif_formateurs"
};

const fieldsToTrim = [
  "denomination",
  "organisme_etranger_represente_denomination"
];

const trimFields = (obj: Record<string, string>, fields: string[]) =>
  fields.reduce((obj, field) => {
    obj[field] = obj[field].trim().replace(/ +/g, ' ');

    return obj;
  }, obj);

const getConfig = (fileName: string): IngestDbConfig => ({
  fieldsMapping,
  filename: fileName,
  table: "organismes_formation",
  truncate: true,
  separator: ";",
  nonEmptyFields: ["siren"],
  deduplicateField: ["siren"],
  padSiren: true,
  sanitizeHtmlChars: false,
  transform: () => mapRow((row: Record<string, string>) => trimFields(row, fieldsToTrim),
  ) as Transform,
  updateHistoryQuery: `UPDATE import_updates SET date = CURRENT_TIMESTAMP,
                        date_import = CURRENT_TIMESTAMP WHERE "table" = 'organismes_formation';`
});

export class OrganismesFormation implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Organismes de formation Ingest",
    name: "organismesFormation",
    group: ['transform'],
    version: 1,
    description: "Organismes de formation Ingestor",
    defaults: {
      name: 'Organismes de formation Ingest',
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
        default: '*_public_of.csv',
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
