import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const effectifsEtablissementsEtpQuery = gql`
  query ActiviteApiQuery($siret: String!, $effectifsMaxCount: Int) {
    fce_etablissements_etp_effectif(
      where: { siret: { _eq: $siret } }
      order_by: { periode_concerne: desc }
      limit: $effectifsMaxCount
    ) {
      periode_concerne
      effectif
      siret
    }
  }
`;

export const useEffectifsEtablissementsEtpData = pipe(
  (siret, { effectifsMaxCount } = {}) =>
    useQuery(effectifsEtablissementsEtpQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { effectifsMaxCount, siret },
    }),
  mapQueryResult(prop("fce_etablissements_etp_effectif"))
);
