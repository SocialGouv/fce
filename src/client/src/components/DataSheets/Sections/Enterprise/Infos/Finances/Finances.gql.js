import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const financeQuery = gql`
  query GetFinance($siret: String!) {
    finance(siret: $siret) {
      data {
        ca: chiffre_affaires
        date_fin_exercice
      }
    }
  }
`;

export const useFinanceData = pipe(
  (siret) => useQuery(financeQuery, { variables: { siret } }),
  mapQueryResult(prop("finance"))
);
