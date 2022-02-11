import { gql, useQuery } from "@apollo/client";
import { pipe } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const developpementEconomiqueQuery = gql`
  query getDeveloppementEconomiqueQuery($siret: String!) {
    fce_interactions_pole_3e(where: { siret: { _eq: $siret } }) {
      filieres
      suivi_eti
    }
    fce_poles_competitivite(where: { siret: { _eq: $siret } }) {
      designation_pole
    }
  }
`;

export const useDeveloppementEconomiqueData = pipe(
  (siret) =>
    useQuery(developpementEconomiqueQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(({ fce_interactions_pole_3e, fce_poles_competitivite }) => ({
    interactionsPole3e: fce_interactions_pole_3e,
    poleCompetitivite: fce_poles_competitivite,
  }))
);
