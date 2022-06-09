import { gql, useQuery } from "@apollo/client";

const associationQuery = gql`
  query GetAssociation($siret: String!) {
    association(siret: $siret) {
      id
    }
  }
`;

export const useAssociationData = (siret) =>
  useQuery(associationQuery, { variables: { siret } });
