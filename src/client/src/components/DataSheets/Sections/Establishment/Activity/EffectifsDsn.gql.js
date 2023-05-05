import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const effectifsDsnQuery = gql`
  query getEtablissementsEffectifDsn(
    $siret: String!
    $order_by: [fce_etablissements_dsn_effectif_order_by!]
    $limit: Int
  ) {
    fce_etablissements_dsn_effectif(
      where: { siret: { _eq: $siret } }
      order_by: $order_by
      limit: $limit
    ) {
      siret
      date_maj
      cdd
      cdi
      cdi_inter
      femmes
      hommes
      interim
      inter_mission
      mois
      eff
    }
  }
`;

export const useDsnEffectif = pipe(
  (siret, { limit }, order_by = { mois: "desc" }) =>
    useQuery(effectifsDsnQuery, {
      context: {
        clientName: BCE_CLIENT,
      },
      variables: { limit, order_by, siret },
    }),
  mapQueryResult(prop("fce_etablissements_dsn_effectif"))
);
