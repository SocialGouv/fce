import { range, some, sum } from "lodash";

export const isOrganismeFormation = data => data.length > 0;

export const getNumeroDeclaration = data =>
  data.map(declaration => declaration.numero_declaration_activite).join(", ");
export const getDenomination = data =>
  data.map(declaration => declaration.denomination).join(", ");
export const getDenominationOrganismeEtranger = data =>
  data
    .map(declaration => declaration.organisme_etranger_represente_denomination)
    .join(", ");

export const hasVae = data => some(data, ({ vae }) => vae);
export const hasActionsFormation = data =>
  some(data, ({ actions_de_formation }) => actions_de_formation);
export const hasBilanCompetence = data =>
  some(data, ({ bilans_de_competences }) => bilans_de_competences);
export const hasActionFormationParApprentissage = data =>
  some(
    data,
    ({ actions_de_formation_par_apprentissage }) =>
      actions_de_formation_par_apprentissage
  );

const getDeclarationSpecialties = data =>
  range(1, 3)
    .filter(index => data[`code_specialite_${index}`] !== null)
    .map(
      index =>
        `${data[`libelle_specialite_${index}`]} [${
          data[`code_specialite_${index}`]
        }]`
    );

export const getSpecialties = data => data.flatMap(getDeclarationSpecialties);

export const getNombreStagiaires = data =>
  sum(data.map(({ nb_stagiaires }) => nb_stagiaires));
export const getNombreStagiairesAutreOrganisme = data =>
  sum(
    data.map(
      ({ nb_stagiaires_confies_par_un_autre_of }) =>
        nb_stagiaires_confies_par_un_autre_of
    )
  );
export const getEffectifFormateur = data =>
  sum(data.map(({ effectif_formateurs }) => effectif_formateurs));
