import { gql, useQuery } from "@apollo/client";
import { pipe } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";
import {
  // normalizeInteractions3E,
  // normalizeInteractions3ESRC,
  normalizeInteractionsC,
  normalizeInteractionsT,
} from "../../../../../utils/interactions/interactions";

const controlesQuery = gql`
  query getControles($siret: String!) {
    fce_interactions_pole_c(where: { SIRET: { _eq: $siret } }) {
      siret: SIRET
      date: DATE_DERNIER_CONTROLE
      unite: LIB_UC
      interactions_pole_c_siret {
        denominationusuelleetablissement
      }
    }
    fce_metrologie(
      where: { siret: { _eq: $siret } }
      order_by: { date_controle: desc }
      limit: 1
    ) {
      siret
      date: date_controle
      unite: libelle_region
      type: libelle_categorie
    }

    fce_interactions_pole_t(where: { siret: { _eq: $siret } }) {
      date
      intervenant
      action_sur
      realise_pour
      siret
    }
    # fce_interactions_pole_3e(where: { siret: { _eq: $siret } }) {
    #   inspecteurs
    #   date_visite
    #   type_suivi
    #   region
    #   siret
    # }
    # fce_interactions_pole_3e_src(where: { siret: { _eq: $siret } }) {
    #   date
    #   libelle_region
    #   siret
    #   type_controle
    #   nature_controle
    #   cible_controle
    #   clos
    # }
  }
`;

const normalizeResponsesToInteraction = ({
  // fce_interactions_pole_3e,
  // fce_interactions_pole_3e_src,
  fce_interactions_pole_c,
  fce_interactions_pole_t,
  fce_metrologie,
}) => ({
  // interactions_pole_3e: normalizeInteractions3E(fce_interactions_pole_3e),
  // interactions_pole_3e_src: normalizeInteractions3ESRC(
  //   fce_interactions_pole_3e_src
  // ),
  interactions_pole_c: normalizeInteractionsC(fce_interactions_pole_c),

  interactions_pole_c_metrologie: normalizeInteractionsC(fce_metrologie),
  interactions_pole_t: normalizeInteractionsT(fce_interactions_pole_t),
});

export const useControles = pipe(
  (siret) =>
    useQuery(controlesQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(normalizeResponsesToInteraction)
);
