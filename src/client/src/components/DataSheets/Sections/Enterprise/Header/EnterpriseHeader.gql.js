import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const raisonSocialeQuery = gql`
  query GetEnterpriseHeader($siren: String!) {
    entreprise(siren: $siren) {
      raison_sociale
    }
  }
`;

export const useRaisonSociale = pipe(
  (siren) => useQuery(raisonSocialeQuery, { variables: { siren } }),
  mapQueryResult(prop("entreprise.raison_sociale"))
);
