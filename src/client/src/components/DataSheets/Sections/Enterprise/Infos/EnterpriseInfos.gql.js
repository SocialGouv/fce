import { gql, useQuery } from "@apollo/client";

export const EnterpriseInfosEntrepriseFragment = gql`
  fragment EnterpriseInfosEntrepriseFragment on entreprises {
    api {
      capital_social
      effectifs_annuel {
        annee
        effectifs_annuels
      }
      effectifs_mensuels {
        mois
        annee
        effectifs_mensuels
      }
      extraits_rcs_infogreffe {
        date_immatriculation
        observations {
          date
          date_timestamp
          libelle
        }
      }
      mandataires_sociaux {
        fonction
        prenom
        nom
        raison_sociale
      }
      numero_tva_intracommunautaire
      siret_siege_social
    }
  }
`;

const entrepriseInfosQuery = gql`
  query GetEntrepriseInfos($siren: String) {
    entreprises(where: { siren: { _eq: $siren } }) {
      ...EnterpriseInfosEntrepriseFragment
    }
  }
  ${EnterpriseInfosEntrepriseFragment}
`;

export const useEntrepriseInfos = (siren) =>
  useQuery(entrepriseInfosQuery, { variables: { siren } });
