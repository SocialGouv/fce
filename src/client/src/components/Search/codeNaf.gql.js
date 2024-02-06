import { gql, useQuery } from "@apollo/client";
import { pipe } from "lodash/fp";

import { BCE_CLIENT } from "../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../utils/graphql/graphql";

const codeNafQuery = gql`
  query getCodeNaf {
    fce_naf_complet {
      value: Naf5_code
      Naf5_code
      Naf5_lb
      label: Naf5_lb
    }
  }
`;

export const useCodeNaf = pipe(
  () => useQuery(codeNafQuery, { context: { clientName: BCE_CLIENT } }),
  mapQueryResult((data) =>
    data.fce_naf_complet.map((item) => ({
      ...item,
      label: `${item.Naf5_code} - ${item.Naf5_lb}`,
    }))
  )
);
