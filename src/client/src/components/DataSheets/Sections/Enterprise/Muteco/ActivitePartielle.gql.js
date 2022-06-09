import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

const ActivitePartielleQuery = gql`
  query GetActivitePartielle($siren: String!) {
    etablissements_activite_partielle: fce_etablissements_activite_partielle(
      where: { siren: { _eq: $siren } }
    ) {
      etablissement: etablissements_activite_partielle_siret {
        etablissementsiege
        etatadministratifetablissement
      }
      cause
      da_init
      date_decision
      nb_h_auto_avn
      nb_h_auto_cum
      nb_h_conso_cum
      num_avenant
      num_convention
      siret
    }
  }
`;

export const useActivitePartielle = (siren) =>
  useQuery(ActivitePartielleQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siren },
  });
