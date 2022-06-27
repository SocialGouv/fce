import { gql, useQuery } from "@apollo/client";
import { pipe } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { getSirenFromSiret } from "../../../../../utils/establishment/establishment";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const psiQuery = gql`
  query GetPsi($siret: String!, $siren: String!) {
    psi_siret: fce_psi_siret(where: { SIRET: { _eq: $siret } }) {
      salaries_annee_courante
      salaries_annee_precedente
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

export const usePsi = pipe(
  (siret) =>
    useQuery(psiQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siren: getSirenFromSiret(siret), siret },
    }),
  mapQueryResult(({ psi_siret, psi_siren, psi_update }) => ({
    psi_siren: psi_siren[0],
    psi_siret: psi_siret[0],
    psi_update: psi_update[0],
  }))
);
