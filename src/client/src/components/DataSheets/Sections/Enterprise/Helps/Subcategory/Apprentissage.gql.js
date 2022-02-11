import { gql, useQuery } from "@apollo/client";

const ApprentissageQuery = gql`
  query GetActivitePartielle($siren: String!) {
    etablissements_apprentissage(where: { siren: { _eq: $siren } }) {
      date_debut
      date_rupture
      numero_enregistrement
      siren
      siret
      type_contrat
      etablissement {
        siret
        etatadministratifetablissement
        codepostaletablissement
        libellecommuneetablissement
      }
    }
  }
`;

export const useApprentissageBySiren = (siren) =>
  useQuery(ApprentissageQuery, { variables: { siren } });
