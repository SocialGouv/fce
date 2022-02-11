import { gql, useQuery } from "@apollo/client";

export const AccordsEntrepriseEntrepriseFragment = gql`
  fragment AccordsEntrepriseEntrepriseFragment on entreprises {
    prenom1unitelegale
    nomunitelegale
    denominationunitelegale
    denominationusuelle1unitelegale
  }
`;

const GetAccordsEntrepriseQuery = gql`
  query GetAccordsEntreprise($siren: String!) {
    etablissements_accords(where: { siren: { _eq: $siren } }) {
      siret
      dt_sign
      etablissement {
        etablissementsiege
        etatadministratifetablissement
      }
    }
  }
`;

export const useAccordsEntrepriseBySiren = (siren) =>
  useQuery(GetAccordsEntrepriseQuery, { variables: { siren } });
