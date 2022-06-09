import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const raisonSocialeQuery = gql`
  query GetEstablishementHeader($siren: String!) {
    entreprise(siren: $siren) {
      raison_sociale
    }
  }
`;

export const useRaisonSociale = pipe(
  (siren) => useQuery(raisonSocialeQuery, { variables: { siren } }),
  mapQueryResult(prop("entreprise.raison_sociale"))
);

const entrepriseNameQuery = gql`
  query getNomEntreprise($siren: String!) {
    fce_entreprises(where: { siren: { _eq: $siren } }) {
      denominationunitelegale
      denominationusuelle1unitelegale
      prenom1unitelegale
      nomunitelegale
    }
  }
`;

export const useEntrepriseNameData = pipe(
  (siren) =>
    useQuery(entrepriseNameQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siren },
    }),
  mapQueryResult(prop("fce_entreprises[0]"))
);
