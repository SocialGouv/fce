import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

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
  query GetEffectifsMensuels($siren: String!, $limit: Int) {
    entreprise(siren: $siren) {
      effectifs_mensuels(length: $limit) {
        mois
        annee
        effectifs_mensuels
      }
    }
  }
`;

export const useEffectifsMensuels = pipe(
  (siren, limit) =>
    useQuery(effectifsMensuelsQuery, { variables: { limit, siren } }),
  mapQueryResult(prop("entreprise.effectifs_mensuels"))
);
