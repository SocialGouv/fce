import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { getSirenFromSiret } from "../../../../../utils/establishment/establishment";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const dashboardQuery = gql`
  query getDashboardData($siret: String!, $siren: String!) {
    licePlus10: fce_rupco_etablissements(
      where: { siret: { _eq: $siret }, type: { _eq: "LiceC +10" } }
      limit: 1
    ) {
      siret
      type
    }
    liceMoins10: fce_rupco_etablissements(
      where: { siret: { _eq: $siret }, type: { _eq: "LiceC -10" } }
      limit: 1
    ) {
      siret
      type
    }
    pse: fce_rupco_etablissements(
      where: { siret: { _eq: $siret }, type: { _eq: "PSE" } }
      limit: 1
    ) {
      siret
      type
    }
    rcc: fce_rupco_etablissements(
      where: { siret: { _eq: $siret }, type: { _eq: "RCC" } }
      limit: 1
    ) {
      siret
      type
    }
    fce_etablissements_activite_partielle(
      where: { siret: { _eq: $siret } }
      limit: 1
    ) {
      siret
    }
    fce_interactions_pole_c(
      where: { siret: { _eq: $siret } }
      order_by: { mois: desc }
      limit: 1
    ) {
      date
    }
    fce_interactions_pole_t(
      where: { siret: { _eq: $siret } }
      order_by: { date: desc }
      limit: 1
    ) {
      date
    }
    fce_interactions_pole_3e(
      where: { siret: { _eq: $siret } }
      order_by: { date_visite: desc }
      limit: 1
    ) {
      date_visite
    }
    fce_interactions_pole_3e_src(
      where: { siret: { _eq: $siret } }
      order_by: { date: desc }
      limit: 1
    ) {
      date
    }
    fce_psi_siren(where: { siren: { _eq: $siren } }, limit: 1) {
      salaries_annee_courante
      salaries_annee_precedente
    }
    fce_psi_siret(where: { SIRET: { _eq: $siret } }, limit: 1) {
      SIRET
    }
    fce_organismes_formation(where: { siret: { _eq: $siret } }, limit: 1) {
      siret
    }
    fce_accidents_travail(where: { SIRET: { _eq: $siret } }, limit: 1) {
      total
    }
    fce_etablissements_iae(where: { siret: { _eq: $siret } }, limit: 1) {
      siret
    }
    fce_etablissements_contrats_aides(
      where: { siret: { _eq: $siret } }
      limit: 1
    ) {
      siret
    }
    fce_etablissements_apprentissage(
      where: { siret: { _eq: $siret } }
      limit: 1
    ) {
      date_debut
    }
  }
`;

export const useDashboardData = pipe(
  (siret) =>
    useQuery(dashboardQuery, {
      context: {
        clientName: BCE_CLIENT,
      },
      variables: {
        siren: getSirenFromSiret(siret),
        siret,
      },
    }),
  mapQueryResult(
    ({
      fce_etablissements_activite_partielle,
      fce_interactions_pole_c,
      fce_interactions_pole_t,
      fce_interactions_pole_3e,
      fce_interactions_pole_3e_src,
      fce_psi_siren,
      fce_psi_siret,
      fce_organismes_formation,
      fce_accidents_travail,
      fce_etablissements_iae,
      fce_etablissements_contrats_aides,
      fce_etablissements_apprentissage,
      ...rest
    }) => ({
      ...rest,
      accidents_travail: fce_accidents_travail,
      activite_partielle: fce_etablissements_activite_partielle,
      etablissements_apprentissage: fce_etablissements_apprentissage,
      etablissements_contrats_aides: fce_etablissements_contrats_aides,
      etablissements_iae: fce_etablissements_iae,
      interactions_pole_3e: fce_interactions_pole_3e,
      interactions_pole_3e_src: fce_interactions_pole_3e_src,
      interactions_pole_c: fce_interactions_pole_c,
      interactions_pole_t: fce_interactions_pole_t,
      organismes_formation: fce_organismes_formation,
      psi_siren: fce_psi_siren.map(({ SIRET, ...rest }) => ({
        siret: SIRET,
        ...rest,
      })),
      psi_siret: fce_psi_siret[0],
    })
  )
);

const effectifQuery = gql`
  query getEffectifs($siret: String!) {
    fce_etablissements_dsn_eff(
      where: { siret: { _eq: $siret } }
      order_by: { mois: desc }
      limit: 1
    ) {
      eff
    }
  }
`;

export const useLastEffectif = pipe(
  (siret) =>
    useQuery(effectifQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_etablissements_dsn_eff[0].eff"))
);

const trancheEffectifsInseeQuery = gql`
  query trancheEffectifsInseeQuery($siret: String!) {
    etablissement(siret: $siret) {
      tranche_effectif_salarie_etablissement {
        intitule
        date_reference
      }
    }
  }
`;

export const useTrancheEffectifsInsee = pipe(
  (siret) =>
    useQuery(trancheEffectifsInseeQuery, {
      variables: {
        siret,
      },
    }),
  mapQueryResult(prop("etablissement.tranche_effectif_salarie_etablissement"))
);

export const useEffectif = (siret) => {
  const {
    data: trancheEffectif,
    loading: trancheEffectifLoading,
    error: trancheEffectifError,
  } = useTrancheEffectifsInsee(siret);
  const {
    data: lastEffectif,
    loading: lastEffectifLoading,
    error: lastEffectifError,
  } = useLastEffectif(siret);

  return {
    data: lastEffectif ?? trancheEffectif?.intitule,
    error:
      trancheEffectifError && lastEffectifError ? trancheEffectifError : null,
    loading: trancheEffectifLoading && lastEffectifLoading,
  };
};
