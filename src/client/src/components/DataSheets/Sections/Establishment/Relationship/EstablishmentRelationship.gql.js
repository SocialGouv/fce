import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const accordsEntrepriseQuery = gql`
  query GetAccords($siret: String!) {
    accords: fce_etablissements_accords(where: { siret: { _eq: $siret } }) {
      autres
      classifications
      conditions_travail
      droit_syndical
      dt_sign
      egalite_pro
      emploi
      epargne
      formation
      nouvelles_technologies
      num_dos
      protection_sociale
      remuneration
      temps_travail
    }
  }
`;

export const useAccordsEntreprise = pipe(
  (siret) =>
    useQuery(accordsEntrepriseQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("accords"))
);
