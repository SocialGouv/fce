import { useQuery, gql } from "@apollo/client";

const accidentTravailBySiretQuery = gql`
  query GetAccidentTravail($siret: String!) {
    accidents_travail(where: { siret: { _eq: $siret } }) {
      siret
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
    accidents_travail(where: { siren: { _eq: $siren } }) {
      siret
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

export const useAccidentTravailBySiren = siren =>
  useQuery(accidentTravailBySirenQuery, { variables: { siren } });

export const useAccidentTravailBySiret = siret =>
  useQuery(accidentTravailBySiretQuery, { variables: { siret } });
