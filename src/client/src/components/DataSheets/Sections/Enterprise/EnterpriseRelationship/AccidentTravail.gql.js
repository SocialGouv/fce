import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

const GetAccidentTravailQuery = gql`
  query GetAccidentTravail($siren: String!) {
    accidents_travail: fce_accidents_travail(
      where: { siren: { _eq: $siren } }
    ) {
      avec_arret_travail
      code_naf_niv1
      etablissement: accidents_travail_siret {
        siret
        libellecommuneetablissement
        libellecommune2etablissement
        etatadministratifetablissement
      }
      mortels
      pour_1000
      pour_1000_secteur_national
      pour_1000_secteur_regional
      sans_arret_travail
      siret: SIRET
      total
    }
  }
`;

export const useAccidentsTravailBySiren = (siren) =>
  useQuery(GetAccidentTravailQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siren },
  });
