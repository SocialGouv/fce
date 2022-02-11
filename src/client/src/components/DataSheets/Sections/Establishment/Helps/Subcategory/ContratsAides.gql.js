import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const ContratsAidesQuery = gql`
  query GetContratsAides($siret: String!) {
    fce_etablissements_contrats_aides(
      limit: 5
      where: { siret: { _eq: $siret } }
    ) {
      contrat_aide
      CA_entree_2018
      CA_stock_12_2018
    }
  }
`;

export const useContratsAides = pipe(
  (siret) =>
    useQuery(ContratsAidesQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_etablissements_contrats_aides[0]"))
);
