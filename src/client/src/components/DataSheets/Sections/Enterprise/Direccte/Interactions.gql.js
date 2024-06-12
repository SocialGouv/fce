import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

const interactionsQuery = gql`
  query GetInteractions($siren: String!) {
    interactions_3E_SEER: fce_interactions_pole_3e(
      where: { siren: { _eq: $siren } }
    ) {
      siret
      type_suivi
      date_visite
      inspecteurs
      region
      etablissement: interactions_pole_3e_siret {
        etatadministratifetablissement
        siret
        codepostaletablissement
        codepostal2etablissement
        libellecommuneetablissement
        libellecommune2etablissement
      }
    }
    interactions_3E_SRC: fce_interactions_pole_3e_src(
      where: { siren: { _eq: $siren } }
    ) {
      siret
      date
      libelle_region
      etablissement: interactions_pole_3e_src_siret {
        etatadministratifetablissement
        siret
        codepostaletablissement
        codepostal2etablissement
        libellecommuneetablissement
        libellecommune2etablissement
      }
    }
    interactions_C: fce_interactions_pole_c(where: { SIRNE: { _eq: $siren } }) {
      siret: SIRET
      date: DATE_DERNIER_CONTROLE
      unite: LIB_UC
      etablissement: interactions_pole_c_siret {
        etatadministratifetablissement
        siret
        codepostaletablissement
        codepostal2etablissement
        libellecommuneetablissement
        libellecommune2etablissement
      }
    }
    interactions_T: fce_interactions_pole_t(where: { siren: { _eq: $siren } }) {
      siret
      type_intervention
      intervenant
      realise_pour
      date
      action_sur
      etablissement: interactions_pole_t_siret {
        etatadministratifetablissement
        siret
        codepostaletablissement
        codepostal2etablissement
        libellecommuneetablissement
        libellecommune2etablissement
      }
    }
  }
`;

export const useInteractionsBySiren = (siren) =>
  useQuery(interactionsQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siren },
  });
