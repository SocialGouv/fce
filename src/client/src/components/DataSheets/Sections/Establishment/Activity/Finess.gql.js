import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const finessQuery = gql`
  query GetFiness($siret: String!) {
    fce_finess(where: { siret: { _eq: $siret } }) {
      Numero_FINESS_EJ
      Numero_FINESS_ET
    }
  }
`;

export const useFinessEstablishment = pipe(
  (siret) =>
    useQuery(finessQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_finess[0]"))
);
