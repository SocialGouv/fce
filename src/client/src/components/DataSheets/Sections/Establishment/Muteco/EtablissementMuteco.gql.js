import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { getSirenFromSiret } from "../../../../../utils/establishment/establishment";

const mutecoQuery = gql`
  query MutecoQuery($siret: String!, $siren: String!) {
    etablissements_activite_partielle: fce_etablissements_activite_partielle(
      where: { siret: { _eq: $siret } }
    ) {
      cause
      da_init
      date_decision
      nb_h_auto_avn
      nb_h_auto_cum
      nb_h_conso_cum
      num_avenant
      num_convention
      siren
      siret
    }
    rupco_etablissements: fce_rupco_etablissements(
      where: { siret: { _eq: $siret } }
    ) {
      date_enregistrement
      date_jugement
      effectif_etablissement
      nombre_de_ruptures_de_contrats_en_debut_de_procedure
      nombre_de_ruptures_de_contrats_en_fin_de_procedure
      numero
      siren
      situation_juridique
      type
      siret
      procedure: rupco_etablissements_procedure {
        etat
      }
    }
    otherRupco: fce_rupco_etablissements(
      where: { siren: { _eq: $siren }, siret: { _neq: $siret } }
    ) {
      numero
    }
  }
`;

export const useMutecoData = (siret) =>
  useQuery(mutecoQuery, {
    context: {
      clientName: BCE_CLIENT,
    },
    variables: { siren: getSirenFromSiret(siret), siret },
  });
