import { gql, useQuery } from "@apollo/client";

export const EnterpriseHeaderEntrepriseFragment = gql`
  fragment EnterpriseHeaderEntrepriseFragment on entreprises {
    api {
      raison_sociale
    }
  }
`;

const entrepriseHeaderQuery = gql`
  query GetEnterpriseHeader($siren: String!) {
    entreprises(where: { siren: { _eq: $siren } }) {
      ...EnterpriseHeaderEntrepriseFragment
    }
  }

  ${EnterpriseHeaderEntrepriseFragment}
`;

export const useEntrepriseHeaderData = (siren) =>
  useQuery(entrepriseHeaderQuery, { variables: { siren } });
