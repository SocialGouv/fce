import { gql } from "@apollo/client";

export const EgaproEntrepriseFragment = gql`
  fragment EgaproEntrepriseFragment on entreprises {
    egapro {
      annee
      index
    }
  }
`;
