import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const financeQuery = gql`
  query FinanceIndicatorsQuery($siren: String!) {
    bilan_C: fce_finance_indicateurs(
      where: { siren: { _eq: $siren }, type_bilan: { _neq: "K" } }
      order_by: { date_cloture_exercice: desc }
    ) {
      EBIT
      Marge_brute
      EBE
      Resultat_net
      ca: Chiffre_d_affaires
      date_fin_exercice: date_cloture_exercice
    }
    bilan_Type_K: fce_finance_indicateurs(
      where: { siren: { _eq: $siren }, type_bilan: { _eq: "k" } }
      order_by: { date_cloture_exercice: desc }
    ) {
      EBIT
      Marge_brute
      EBE
      Resultat_net
      ca: Chiffre_d_affaires
      date_fin_exercice: date_cloture_exercice
      type_bilan
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
  mapQueryResult(({ bilan_C, bilan_Type_K }) => ({
    bilan_K: bilan_Type_K,
    donneesEcofiBce: bilan_C,
  }))
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
