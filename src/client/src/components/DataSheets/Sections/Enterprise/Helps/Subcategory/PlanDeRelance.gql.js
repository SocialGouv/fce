import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const PlanRelanceQuery = gql`
  query GetPlanRelance($siren: String!) {
    fce_planrelance(where: { siren: { _eq: $siren } }) {
      mesure
    }
  }
`;

export const usePlanRelanceBySiren = pipe(
  (siren) =>
    useQuery(PlanRelanceQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siren },
    }),
  mapQueryResult(prop("fce_planrelance[0]"))
);
