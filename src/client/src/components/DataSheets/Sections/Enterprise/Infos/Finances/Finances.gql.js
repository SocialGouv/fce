import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const financeQuery = gql`
  query FinanceIndicatorsQuery($siren: String!) {
    fce_finance_indicateurs(
      where: { siren: { _eq: $siren } }
      order_by: { date_cloture_exercice: desc }
      limit: 5
    ) {
      EBIT
      Marge_brute
      EBE
      Resultat_net
      ca: Chiffre_d_affaires
      date_fin_exercice: date_cloture_exercice
    }
  }
`;

export const useFinanceData = pipe(
  (siren) =>
    useQuery(financeQuery, {
      context: {
        clientName: BCE_CLIENT,
      },
      variables: { siren },
    }),
  mapQueryResult(prop("fce_finance_indicateurs"))
);

const financeApiEntrepriseQuery = gql`
  query GetFinanceApiEntreprise($siret: String!) {
    finance(siret: $siret) {
      data {
        ca: chiffre_affaires
        date_fin_exercice
      }
    }
  }
`;

export const useFinanceDataApiEntreprise = pipe(
  (siret) => useQuery(financeApiEntrepriseQuery, { variables: { siret } }),
  mapQueryResult(prop("finance"))
);
