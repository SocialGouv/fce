import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const trancheEffectifsInseeQuery = gql`
  query trancheEffectifsInseeQuery($siret: String!) {
    etablissement(siret: $siret) {
      tranche_effectif_salarie_etablissement {
        intitule
        date_reference
      }
    }
  }
`;

export const useTrancheEffectifsInsee = pipe(
  (siret) =>
    useQuery(trancheEffectifsInseeQuery, {
      variables: {
        siret,
      },
    }),
  mapQueryResult(prop("etablissement.tranche_effectif_salarie_etablissement"))
);
