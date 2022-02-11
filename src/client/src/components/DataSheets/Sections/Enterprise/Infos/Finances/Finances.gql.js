import { gql, useQuery } from "@apollo/client";

export const FinancesEntrepriseFragment = gql`
  fragment FinancesEntrepriseFragment on entreprises {
    api {
      donnees_ecofi {
        ca
        date_fin_exercice
        date_fin_exercice_timestamp
      }
    }
  }
`;

const financeQuery = gql`
  query GetFinance($siren: String) {
    entreprises(where: { siren: { _eq: $siren } }) {
      ...FinancesEntrepriseFragment
    }
  }
  ${FinancesEntrepriseFragment}
`;

export const useFinanceData = (siren) =>
  useQuery(financeQuery, { variables: { siren } });
