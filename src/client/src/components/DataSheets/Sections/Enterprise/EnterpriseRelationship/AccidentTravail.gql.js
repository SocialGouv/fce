import { gql, useQuery } from "@apollo/client";

const GetAccidentTravailQuery = gql`
  query GetAccidentTravail($siren: String!) {
    accidents_travail(where: { siren: { _eq: $siren } }) {
      avec_arret_travail
      code_naf_niv1
      etablissement {
        siret
        libellecommuneetablissement
        libellecommune2etablissement
      }
      mortels
      pour_1000
      pour_1000_secteur_national
      pour_1000_secteur_regional
      sans_arret_travail
      siret
      total
    }
  }
`;

export const useAccidentsTravailBySiren = (siren) =>
  useQuery(GetAccidentTravailQuery, { variables: { siren } });
