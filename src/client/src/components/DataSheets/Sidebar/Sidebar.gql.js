import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { getAggregateCount } from "../../../utils/graphql/graphql";

const sidebarQuery = gql`
  query SidebarQuery($siren: String!, $limit: Int) {
    entreprises(where: { siren: { _eq: $siren } }) {
      etablissements(
        order_by: {
          etablissementsiege: desc
          etatadministratifetablissement: asc
        }
        limit: $limit
      ) {
        siret
        etablissementsiege
        etatadministratifetablissement
        codepostaletablissement
        codepostal2etablissement
        libellecommuneetablissement
        libellecommune2etablissement
      }
      etablissements_total: etablissements_aggregate {
        aggregate {
          count
        }
      }
      etablissements_ouverts: etablissements_aggregate(
        where: { etatadministratifetablissement: { _eq: "A" } }
      ) {
        aggregate {
          count
        }
      }

      naf {
        libelle
      }
    }
  }
`;

export const useSidebarData = (siren, { limit } = {}) =>
  useQuery(sidebarQuery, { variables: { limit, siren } });

export const getEtablissementsCount = pipe(
  prop("etablissements_total"),
  getAggregateCount
);

export const getEtablissementsOuvertsCount = pipe(
  prop("etablissements_ouverts"),
  getAggregateCount
);
