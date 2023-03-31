import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const entrepriseInfosQuery = gql`
  query GetEntrepriseInfos($siren: String!) {
    entreprise(siren: $siren) {
      capital_social
      effectifs_annuel {
        annee
        effectifs_annuels
      }
      effectifs_mensuels {
        mois
        annee
        effectifs_mensuels
      }
      extraits_rcs_infogreffe {
        date_immatriculation
        observations {
          date
          date_timestamp
          libelle
        }
      }
      mandataires_sociaux {
        fonction
        prenom
        nom
        raison_sociale
      }
      numero_tva_intracommunautaire
      siret_siege_social
    }
  }
`;

export const useEntrepriseInfos = pipe(
  (siren) => useQuery(entrepriseInfosQuery, { variables: { siren } }),
  mapQueryResult(prop("entreprise"))
);

const effectifsMensuelsQuery = gql`
  query getEffectifETP($siren: String!, $limit: Int!) {
    fce_entreprises_etp_effectif(
      where: { siren: { _eq: $siren } }
      order_by: { periode_concerne: desc }
      limit: $limit
    ) {
      periode_concerne
      effectif
    }
  }
`;

const effectifsPhysiqueQuery = gql`
  query getEffectifPhysique($siren: String!) {
    fce_Effectifs_Physiques(
      where: { SIREN: { _eq: $siren } }
      order_by: { DATE: desc }
      limit: 1
    ) {
      EFF_TOTAL
    }
  }
`;

export const useEffectifsMensuels = pipe(
  (siren, limit) =>
    useQuery(effectifsMensuelsQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { limit, siren },
    }),
  mapQueryResult(prop("fce_entreprises_etp_effectif"))
);
export const useEffectifsPhysique = pipe(
  (siren) =>
    useQuery(effectifsPhysiqueQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siren },
    }),
  mapQueryResult(prop("fce_Effectifs_Physiques[0].EFF_TOTAL"))
);
