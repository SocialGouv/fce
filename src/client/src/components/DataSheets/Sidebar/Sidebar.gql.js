import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../utils/graphql/graphql";

const sidebarQuery = gql`
  query SidebarQuery($siren: String!, $limit: Int) {
    entreprises: fce_entreprises(where: { siren: { _eq: $siren } }) {
      nomunitelegale
      prenom1unitelegale
      denominationunitelegale
      denominationusuelle1unitelegale
      etablissements: entreprises_etablissements(
        limit: $limit
        order_by: {
          etablissementsiege: desc
          etatadministratifetablissement: asc
        }
      ) {
        siret
        etablissementsiege
        etatadministratifetablissement
        codepostaletablissement
        codepostal2etablissement
        libellecommuneetablissement
        libellecommune2etablissement
        activiteprincipaleetablissement
        trancheeffectifsetablissement
        etb_raisonsociale
      }
      entreprise_nbr_etablissements_siren {
        nb_eta
        nb_eta_fermes
      }
      naf: entreprises_naf {
        libelle
        code
      }
    }
  }
`;
const subHeaderQuery = gql`
  query SubHeaderQuery($siren: String!, $limit: Int) {
    entreprises: fce_entreprises(where: { siren: { _eq: $siren } }) {
      nomunitelegale
      prenom1unitelegale
      denominationunitelegale
      denominationusuelle1unitelegale
      naf: entreprises_naf {
        libelle
        code
      }
    }
  }
`;
export const useSidebarData = pipe(
  (siren, { limit } = {}) =>
    useQuery(sidebarQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { limit, siren },
    }),
  mapQueryResult(prop("entreprises[0]"))
);
export const useSubHeaderData = pipe(
  (siren) =>
    useQuery(subHeaderQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siren },
    }),
  mapQueryResult(prop("entreprises[0]"))
);

export const getEtablissementsCount = prop(
  "entreprise_nbr_etablissements_siren.nb_eta"
);

export const getEtablissementsFermesCount = prop(
  "entreprise_nbr_etablissements_siren.nb_eta_fermes"
);
