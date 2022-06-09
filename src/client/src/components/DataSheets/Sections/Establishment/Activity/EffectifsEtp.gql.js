import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const effectifsEtpQuery = gql`
  query ActiviteApiQuery($siret: String!, $effectifsMaxCount: Int) {
    etablissement(siret: $siret) {
      effectifs_mensuels(maxCount: $effectifsMaxCount) {
        mois
        annee
        effectifs_mensuels
      }
    }
  }
`;

export const useEffectifsEtpData = pipe(
  (siret, { effectifsMaxCount } = {}) =>
    useQuery(effectifsEtpQuery, { variables: { effectifsMaxCount, siret } }),
  mapQueryResult(prop("etablissement.effectifs_mensuels"))
);
