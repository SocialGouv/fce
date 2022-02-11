import { gql, useQuery } from "@apollo/client";
import { mapKeys, pipe, prop } from "lodash/fp";

import { mapQueryData } from "../../../../../utils/queryResponse/queryResponse";

const interactionsQuery = gql`
  query GetInteractions($siren: String!) {
    interactions_pole_3e(where: { siren: { _eq: $siren } }) {
      siret
      type_suivi
      date_visite
      inspecteurs
      region
    }
    interactions_pole_3e_src(where: { siren: { _eq: $siren } }) {
      siret
      date
      libelle_region
    }
    interactions_pole_c(where: { siren: { _eq: $siren } }) {
      siret
      date
      unite
    }
    interactions_pole_t(where: { siren: { _eq: $siren } }) {
      siret
      type_intervention
      intervenant
      realise_pour
      date
      action_sur
    }
  }
`;

const interactionsKeysMap = {
  interactions_pole_3e: "interactions_3E_SEER",
  interactions_pole_3e_src: "interactions_3E_SRC",
  interactions_pole_c: "interactions_C",
  interactions_pole_t: "interactions_T",
};

const normalizeInteractionsKeys = (key) => prop(interactionsKeysMap, key);

export const useInteractionsBySiren = pipe(
  (siren) => useQuery(interactionsQuery, { variables: { siren } }),
  mapQueryData(mapKeys(normalizeInteractionsKeys))
);
