import { gql, useQuery } from "@apollo/client";
import { pipe } from "lodash/fp";

import { mapQueryResult } from "../../utils/graphql/graphql";
import { BCE_CLIENT } from "../GraphQL/GraphQL";

const entrepriseQuery = gql`
  query GetEntreprise($siren: String!) {
    entreprises: fce_entreprises(where: { siren: { _eq: $siren } }) {
      siren
      datecreationunitelegale
      etatadministratifunitelegale
      datederniertraitementunitelegale
      datederniertraitementunitelegale
      denominationunitelegale
      denominationusuelle1unitelegale
      nomunitelegale
      prenom1unitelegale
      categorieentreprise
      trancheeffectifsunitelegale
      categorie_juridique: entreprises_cat_jur {
        code
        libelle
      }
      etablissements: entreprises_etablissements {
        siret
        etablissementsiege
        etatadministratifetablissement
        codepostaletablissement
        codepostal2etablissement
        libellecommuneetablissement
        libellecommune2etablissement
      }
      naf: entreprises_naf {
        libelle
        code
      }
    }
    fce_organismes_formation(where: { siren: { _eq: $siren } }) {
      siret
      denomination
    }
    fce_psi_siren(where: { siren: { _eq: $siren } }) {
      salaries_annee_courante
      salaries_annee_precedente
    }
    fce_rupco_etablissements(where: { siren: { _eq: $siren } }) {
      date_enregistrement
      date_jugement
      nombre_de_ruptures_de_contrats_en_debut_de_procedure
      nombre_de_ruptures_de_contrats_en_fin_de_procedure
      siret
      type
      situation_juridique
      numero
      procedure: rupco_etablissements_procedure {
        etat
      }
    }
    fce_egapro_index(where: { siren: { _eq: $siren } }) {
      annee
      index
    }
  }
`;

export const useEntrepriseBySiren = pipe(
  (siren) =>
    useQuery(entrepriseQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siren },
    }),
  mapQueryResult(
    ({
      entreprises,
      fce_egapro_index,
      fce_rupco_etablissements,
      fce_psi_siren,
      fce_organismes_formation,
    }) => ({
      ...entreprises[0],
      egapro: fce_egapro_index,
      organismes_formation: fce_organismes_formation,
      psi: fce_psi_siren,
      rupco: fce_rupco_etablissements,
    })
  )
);
