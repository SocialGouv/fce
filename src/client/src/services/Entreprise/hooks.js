import { gql, useQuery } from "@apollo/client";

import { AccordsEntrepriseEntrepriseFragment } from "../../components/DataSheets/Sections/Enterprise/EnterpriseRelationship/AccordsEntreprise.gql";
import { EgaproEntrepriseFragment } from "../../components/DataSheets/Sections/Enterprise/EnterpriseRelationship/Egapro.gql";
import { PsiEntrepriseFragment } from "../../components/DataSheets/Sections/Enterprise/EnterpriseRelationship/Psi.gql";
import { EnterpriseMutecoFragment } from "../../components/DataSheets/Sections/Enterprise/Muteco/EnterpriseMuteco.gql";

const SIDEBAR_ETABLISSEMENTS_FRAGMENT = gql`
  fragment sidebarEtablissement on etablissements {
    siret
    etablissementsiege
    etatadministratifetablissement
    codepostaletablissement
    codepostal2etablissement
    libellecommuneetablissement
    libellecommune2etablissement
  }
`;

const SIDEBAR_ENTREPRISE_FRAGMENT = gql`
  fragment sidebarEntreprise on entreprises {
    siren
    nomunitelegale
    prenom1unitelegale
    denominationunitelegale
    denominationusuelle1unitelegale
    naf {
      libelle
    }
  }
`;

const entrepriseQuery = gql`
  query GetEntreprise($siren: String!) {
    entreprises(where: { siren: { _eq: $siren } }) {
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
      organismes_formation {
        siret
      }
      etablissements {
        ...sidebarEtablissement
      }
      categorie_juridique {
        code
        libelle
        id
      }
      naf {
        libelle
        code
      }
      idcc {
        siret
        idcc
        libelle {
          libelle
        }
      }

      ...EgaproEntrepriseFragment
      ...EnterpriseMutecoFragment
      ...PsiEntrepriseFragment
      ...sidebarEntreprise
      ...AccordsEntrepriseEntrepriseFragment
    }
  }

  ${SIDEBAR_ETABLISSEMENTS_FRAGMENT}
  ${SIDEBAR_ENTREPRISE_FRAGMENT}
  ${PsiEntrepriseFragment}
  ${EnterpriseMutecoFragment}
  ${EgaproEntrepriseFragment}
  ${AccordsEntrepriseEntrepriseFragment}
`;

const etablissementsEntrepriseQuery = gql`
  query GetEntreprise($siren: String!) {
    entreprises(where: { siren: { _eq: $siren } }) {
      etablissements {
        ...sidebarEtablissement
      }
      ...sidebarEntreprise
    }
  }

  ${SIDEBAR_ETABLISSEMENTS_FRAGMENT}
  ${SIDEBAR_ENTREPRISE_FRAGMENT}
`;

export const useEntrepriseBySiren = (siren) =>
  useQuery(entrepriseQuery, { variables: { siren } });

const associationQuery = gql`
  query GetAssociation($siret: String!) {
    association(siret: $siret) {
      id
    }
  }
`;

export const useAssociationData = (siret) =>
  useQuery(associationQuery, { variables: { siret } });

export const useEtablissementViewData = (siren) =>
  useQuery(etablissementsEntrepriseQuery, { variables: { siren } });
