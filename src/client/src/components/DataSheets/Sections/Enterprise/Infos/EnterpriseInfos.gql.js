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
      extraits_rcs_infogreffe {
        date_immatriculation
        observations {
          date
          libelle
        }
      }
      mandataires_sociaux {
        data {
          fonction
          prenom
          nom
          raison_sociale
        }
      }
      numero_tva_intracommunautaire
      siret_siege_social {
        siret
      }
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

export const useEffectifsMensuels = pipe(
  (siren, limit) =>
    useQuery(effectifsMensuelsQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { limit, siren },
    }),
  mapQueryResult(prop("fce_entreprises_etp_effectif"))
);
