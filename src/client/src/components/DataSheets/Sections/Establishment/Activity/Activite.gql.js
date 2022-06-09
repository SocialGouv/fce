import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

const successionQuery = gql`
  query SuccessionQuery($siret: String!) {
    predecesseurs: fce_etablissements_successions(
      where: { siretetablissementsuccesseur: { _eq: $siret } }
    ) {
      siret: siretetablissementpredecesseur
      dateliensuccession
    }

    successeurs: fce_etablissements_successions(
      where: { siretetablissementpredecesseur: { _eq: $siret } }
    ) {
      siret: siretetablissementsuccesseur
      dateliensuccession
    }
  }
`;

export const useSuccessionData = (siret) =>
  useQuery(successionQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siret },
  });
