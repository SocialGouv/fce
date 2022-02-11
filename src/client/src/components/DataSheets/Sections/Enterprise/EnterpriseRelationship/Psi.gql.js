import { gql } from "@apollo/client";

export const PsiEntrepriseFragment = gql`
  fragment PsiEntrepriseFragment on entreprises {
    psi {
      salaries_annee_courante
      salaries_annee_precedente
    }
  }
`;
