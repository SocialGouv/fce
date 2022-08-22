import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const iaeQuery = gql`
  query GetIae($siret: String!) {
    fce_iae(where: { siret: { _eq: $siret } }) {
      kind_aci
      kind_ai
      kind_ea
      kind_ei
      kind_etti
    }
  }
`;

export const useIaeEstablishment = pipe(
  (siret) =>
    useQuery(iaeQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_iae[0]"))
);
