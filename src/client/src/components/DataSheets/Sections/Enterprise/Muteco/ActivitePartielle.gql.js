import { gql, useQuery } from "@apollo/client";

const ActivitePartielleQuery = gql`
  query GetActivitePartielle($siren: String!) {
    etablissements_activite_partielle(where: { siren: { _eq: $siren } }) {
      etablissement {
        etablissementsiege
        etatadministratifetablissement
      }
      cause
      da_init
      date_decision
      id
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
  useQuery(ActivitePartielleQuery, { variables: { siren } });
