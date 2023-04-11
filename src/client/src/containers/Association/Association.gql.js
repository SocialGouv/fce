import { gql, useQuery } from "@apollo/client";

const associationQuery = gql`
  query GetAssociation($siret: String!) {
    association(siret: $siret) {
      rna
    }
  }
`;

export const useAssociationData = (siret) =>
  useQuery(associationQuery, { variables: { siret } });
