import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const sevesoQuery = gql`
  query GetSeveso($siret: String!) {
    fce_seveso(where: { siret: { _eq: $siret } }) {
      seveso
    }
  }
`;

export const useSevesoEstablishment = pipe(
  (siret) =>
    useQuery(sevesoQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_seveso[0].seveso"))
);
