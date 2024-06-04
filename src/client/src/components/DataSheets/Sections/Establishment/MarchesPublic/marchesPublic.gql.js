import { gql, useQuery } from "@apollo/client";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

const marchesPublicQuery = gql`
  query getMarchesPublic($siret: String!) {
    marches: fce_marches_valides(where: { siret: { _eq: $siret } }) {
      acheteur_id
      codeCPV
      cpv_libelle
      dateNotification
      dureeMois
      montant
      objet
      procedure
      sousTraitanceDeclaree
    }
  }
`;

export const useMarchesPublic = (siret) =>
  useQuery(marchesPublicQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siret },
  });
