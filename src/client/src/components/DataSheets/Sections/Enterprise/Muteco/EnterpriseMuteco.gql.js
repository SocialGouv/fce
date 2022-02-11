import { gql } from "@apollo/client";

export const EnterpriseMutecoFragment = gql`
  fragment EnterpriseMutecoFragment on entreprises {
    rupco {
      date_enregistrement
      date_jugement
      nombre_de_ruptures_de_contrats_en_debut_de_procedure
      nombre_de_ruptures_de_contrats_en_fin_de_procedure
      siret
      type
      situation_juridique
      numero
      procedure {
        etat
      }
    }
  }
`;
