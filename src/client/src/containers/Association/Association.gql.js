import { gql, useQuery } from "@apollo/client";

const associationQuery = gql`
  query GetAssociation($siren: String!) {
    association(siren: $siren) {
      rna
    }
  }
`;

export const useAssociationData = (siren) =>
  useQuery(associationQuery, { variables: { siren } });
