import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const financeQuery = gql`
  query GetFinance($siren: String!) {
    entreprise(siren: $siren) {
      donnees_ecofi {
        ca
        date_fin_exercice
        date_fin_exercice_timestamp
      }
    }
  }
`;

export const useFinanceData = pipe(
  (siren) => useQuery(financeQuery, { variables: { siren } }),
  mapQueryResult(prop("entreprise.donnees_ecofi"))
);
