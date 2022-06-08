import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../GraphQL/GraphQL";

const organismeFormationBySiretQuery = gql`
  query GetOrganismeFormation($siret: String!) {
    organismes_formation: fce_organismes_formation(
      where: { siret: { _eq: $siret } }
    ) {
      siren
      numero_declaration_activite
      denomination
      actions_de_formation
      bilans_de_competences
      vae
      actions_de_formation_par_apprentissage
      organisme_etranger_represente_denomination
      code_specialite_1
      libelle_specialite_1
      code_specialite_2
      libelle_specialite_2
      code_specialite_3
      libelle_specialite_3
      nb_stagiaires
      nb_stagiaires_confies_par_un_autre_of
      effectif_formateurs
    }
  }
`;

const organismeFormationBySirenQuery = gql`
  query GetOrganismeFormation($siren: String!) {
    organismes_formation: fce_organismes_formation(
      where: { siren: { _eq: $siren } }
    ) {
      siret
      numero_declaration_activite
      denomination
      actions_de_formation
      bilans_de_competences
      vae
      actions_de_formation_par_apprentissage
      organisme_etranger_represente_denomination
      code_specialite_1
      libelle_specialite_1
      code_specialite_2
      libelle_specialite_2
      code_specialite_3
      libelle_specialite_3
      nb_stagiaires
      nb_stagiaires_confies_par_un_autre_of
      effectif_formateurs
    }
  }
`;

export const useOrganismeFormationBySiren = (siren) =>
  useQuery(organismeFormationBySirenQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siren },
  });

export const useOrganismeFormationBySiret = (siret) =>
  useQuery(organismeFormationBySiretQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siret },
  });
