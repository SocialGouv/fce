import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../GraphQL/GraphQL";

const accidentTravailBySiretQuery = gql`
  query GetAccidentTravail($siret: String!) {
    accidents_travail: fce_accidents_travail(
      where: { SIRET: { _eq: $siret } }
    ) {
      siret: SIRET
      avec_arret_travail
      code_naf_niv1
      mortels
      pour_1000
      pour_1000_secteur_national
      pour_1000_secteur_regional
      sans_arret_travail
      total
    }
  }
`;

const accidentTravailBySirenQuery = gql`
  query GetAccidentTravail($siren: String!) {
    accidents_travail: fce_accidents_travail(
      where: { siren: { _eq: $siren } }
    ) {
      siret: SIRET
      avec_arret_travail
      code_naf_niv1
      mortels
      pour_1000
      pour_1000_secteur_national
      pour_1000_secteur_regional
      sans_arret_travail
      total
    }
  }
`;

export const useAccidentTravailBySiren = (siren) =>
  useQuery(accidentTravailBySirenQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siren },
  });

export const useAccidentTravailBySiret = (siret) =>
  useQuery(accidentTravailBySiretQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siret },
  });
