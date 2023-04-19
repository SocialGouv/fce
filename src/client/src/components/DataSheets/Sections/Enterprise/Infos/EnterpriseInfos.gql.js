import { gql, useQuery } from "@apollo/client";
import { concat, pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const extraitsRcsInfogreffeQuery = gql`
  query GetExtraitsRcsInfogreffe($siren: String!) {
    extraitsRcsInfogreffe(siren: $siren) {
      date_immatriculation
      observations {
        date
        libelle
      }
      capital {
        montant
      }
    }
  }
`;
const tva_intracommunautaireQuery = gql`
  query GetTva($siren: String!) {
    tva_intracommunautaire(siren: $siren) {
      numero_tva_intracommunautaire: tva_number
    }
  }
`;
const mandataires_sociauxQuery = gql`
  query GetMandataires_sociaux($siren: String!) {
    fce_imr_rep_pm(where: { siren: { _eq: $siren } }) {
      raison_sociale: denomination
      fonction: qualite
    }
    fce_imr_rep_pp(where: { siren: { _eq: $siren } }) {
      fonction: qualite
      nom: nom_patronymique
      prenom: prenoms
    }
  }
`;
export const useMandataireInfos = pipe(
  (siren) =>
    useQuery(mandataires_sociauxQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siren },
    }),
  mapQueryResult((data) => {
    return concat(data.fce_imr_rep_pm, data.fce_imr_rep_pp);
  })
);

export const useExtraitsRcsInfogreffe = pipe(
  (siren) => useQuery(extraitsRcsInfogreffeQuery, { variables: { siren } }),
  mapQueryResult(prop("extraitsRcsInfogreffe"))
);

export const useTva_intracommunautaire = pipe(
  (siren) => useQuery(tva_intracommunautaireQuery, { variables: { siren } }),
  mapQueryResult(prop("tva_intracommunautaire"))
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
