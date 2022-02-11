import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

export const AccordsEntrepriseEntrepriseFragment = gql`
  fragment AccordsEntrepriseEntrepriseFragment on entreprises {
    prenom1unitelegale
    nomunitelegale
    denominationunitelegale
    denominationusuelle1unitelegale
  }
`;

const GetAccordsEntrepriseQuery = gql`
  query GetAccordsEntreprise($siren: String!) {
    etablissements_accords: fce_etablissements_accords(
      where: { siren: { _eq: $siren } }
    ) {
      siret
      dt_sign
      etablissement: etablissements_accords_siret {
        etablissementsiege
        etatadministratifetablissement
      }
    }
  }
`;

export const useAccordsEntrepriseBySiren = (siren) =>
  useQuery(GetAccordsEntrepriseQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siren },
  });
