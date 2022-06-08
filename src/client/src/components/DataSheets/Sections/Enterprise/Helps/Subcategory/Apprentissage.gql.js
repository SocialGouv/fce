import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../../services/GraphQL/GraphQL";

const ApprentissageQuery = gql`
  query GetApprentissage($siren: String!) {
    etablissements_apprentissage: fce_etablissements_apprentissage(
      where: { siren: { _eq: $siren } }
    ) {
      date_debut
      date_rupture
      numero_enregistrement
      siren
      siret
      type_contrat
      etablissement: etablissements_apprentissage_siret {
        siret
        etatadministratifetablissement
        codepostaletablissement
        libellecommuneetablissement
      }
    }
  }
`;

export const useApprentissageBySiren = (siren) =>
  useQuery(ApprentissageQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siren },
  });
