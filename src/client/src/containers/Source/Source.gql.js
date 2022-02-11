import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../utils/graphql/graphql";

const sourceQuery = gql`
  query getSource {
    fce_import_updates {
      table
      date
      date_import
      si
      fournisseur
    }
  }
`;

export const useSources = pipe(
  () => useQuery(sourceQuery, { context: { clientName: BCE_CLIENT } }),
  mapQueryResult(prop("fce_import_updates"))
);
