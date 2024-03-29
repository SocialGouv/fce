import { gql, useQuery } from "@apollo/client";
import { pipe } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

export const PsiEntrepriseFragmentQuery = gql`
  query getPsiEntreprise($match: String!, $siren: String!) {
    psi_siret: fce_psi_siret(where: { SIRET: { _like: $match } }) {
      siret: SIRET
      salaries_annee_courante
      salaries_annee_precedente
      etablissement: psi_siret_siret {
        etablissementsiege
        etatadministratifetablissement
        codepostaletablissement
        libellecommuneetablissement
      }
    }
    psi_siren: fce_psi_siren(where: { siren: { _eq: $siren } }) {
      salaries_annee_courante
      salaries_annee_precedente
    }
    psi_update: fce_import_updates(where: { table: { _eq: "psi_siret" } }) {
      si
      fournisseur
      table
      date
      date_import
    }
  }
`;

export const usePsiEntreprise = pipe(
  (siren) =>
    useQuery(PsiEntrepriseFragmentQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { match: `${siren}%`, siren },
    }),
  mapQueryResult(({ psi_siret, psi_siren, psi_update }) => ({
    psi_siren: psi_siren[0],
    psi_siret: psi_siret,
    psi_update: psi_update[0],
  }))
);
