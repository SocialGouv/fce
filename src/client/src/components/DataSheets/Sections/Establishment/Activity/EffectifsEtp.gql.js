import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const effectifsEtablissementsEtpQuery = gql`
  query ActiviteApiQuery(
    $siret: String!
    $effectifsMaxCount: Int
    $order_by: [fce_etablissements_etp_effectif_order_by!]
    $start_date: date
  ) {
    fce_etablissements_etp_effectif(
      where: { siret: { _eq: $siret }, periode_concerne: { _gte: $start_date } }
      order_by: $order_by
      limit: $effectifsMaxCount
    ) {
      periode_concerne
      effectif
      siret
    }
  }
`;

export const useEffectifsEtablissementsEtpData = pipe(
  (
    siret,
    { effectifsMaxCount } = {},
    order_by = { periode_concerne: "desc" },
    start_date
  ) =>
    useQuery(effectifsEtablissementsEtpQuery, {
      context: { clientName: BCE_CLIENT },
      variables: {
        effectifsMaxCount,
        order_by,
        siret,
        start_date,
      },
    }),
  mapQueryResult(prop("fce_etablissements_etp_effectif"))
);
