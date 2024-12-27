import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../../utils/graphql/graphql";

const AidesFinancieresQuery = gql`
  query GetAidesFinancieresParSiret($siretValue: String!) {
    fce_ademe_aide(
      where: {
        siret: {
          # relationship field on fce_ademe_aide
          siret: { _eq: $siretValue } # the actual scalar column in fce_etablissements
        }
      }
    ) {
      dateConvention
      objet
      Nom_de_l_attribuant
      montant
      nomBeneficiaire
      notificationUE
      siret {
        # must provide nested selection since it's an object
        siret # the scalar field in the fce_etablissements table
      }
    }
  }
`;

export const useAidesFinancieresData = pipe(
  (siretValue) =>
    useQuery(AidesFinancieresQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siretValue },
    }),
  mapQueryResult(prop("fce_ademe_aide"))
);
