import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const ApprentissageQuery = gql`
  query GetApprentissage($siret: String!) {
    apprentissage: fce_etablissements_apprentissage(
      where: { siret: { _eq: $siret } }
    ) {
      numero_enregistrement
      date_debut
      date_rupture
      type_contrat
    }
  }
`;

export const useApprentissageData = pipe(
  (siret) =>
    useQuery(ApprentissageQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("apprentissage"))
);
