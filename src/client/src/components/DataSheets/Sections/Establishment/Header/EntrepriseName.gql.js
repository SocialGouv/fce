import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const raisonSocialeQuery = gql`
  query GetEstablishementHeader($siret: String!) {
    fce_etablissements(where: { siret: { _eq: $siret } }) {
      etb_raisonsociale
    }
  }
`;

export const useRaisonSociale = pipe(
  (siret) =>
    useQuery(raisonSocialeQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_etablissements"))
);
