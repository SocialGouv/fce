import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

const conventionsCollectivesQuery = gql`
  query getConventionsCollectives($siret: String!) {
    etablissements_idcc: fce_etablissements_idcc(
      where: { siret: { _eq: $siret } }
    ) {
      libelle: etablissements_idcc_code {
        code
        libelle
      }
    }
  }
`;

export const useConventionsCollectives = (siret) =>
  useQuery(conventionsCollectivesQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siret },
  });
