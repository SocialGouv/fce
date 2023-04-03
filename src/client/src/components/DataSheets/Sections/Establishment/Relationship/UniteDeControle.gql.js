import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const uniteDeControleQuery = gql`
  query getUniteDeControle($siret: String!) {
    uc: fce_wikit_uc(where: { siret: { _eq: $siret } }) {
      CODE_UC
      LIB_UC
      Courrier_electronique
    }
  }
`;

export const useUniteDeControle = pipe(
  (siret) =>
    useQuery(uniteDeControleQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("uc[0]"))
);
