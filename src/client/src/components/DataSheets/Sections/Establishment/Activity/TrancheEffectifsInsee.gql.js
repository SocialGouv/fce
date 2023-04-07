import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const trancheEffectifsInseeQuery = gql`
  query trancheEffectifsInseeQuery1($siret: String!) {
    etablissement(siret: $siret) {
      tranche_effectif_salarie {
        date_reference
        intitule
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
  mapQueryResult(prop("etablissement.tranche_effectif_salarie"))
);
