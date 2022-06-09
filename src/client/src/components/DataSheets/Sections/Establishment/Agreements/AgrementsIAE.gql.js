import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const agrementsIAEQuery = gql`
  query GetAgrementsIae($siret: String!) {
    fce_etablissements_iae(where: { siret: { _eq: $siret } }) {
      AI
      ACI
      AI_SI2018
      AI_ETP2018
      ACI_SI2018
      ACI_ETP2018
      EI
      ETTI
      EI_SI2018
      EI_ETP2018
      ETTI_SI2018
      ETTI_ETP2018
      siren
      siret
    }
  }
`;

const formatAgrements = ({
  AI,
  ACI,
  AI_SI2018,
  AI_ETP2018,
  ACI_SI2018,
  ACI_ETP2018,
  EI,
  ETTI,
  EI_SI2018,
  EI_ETP2018,
  ETTI_SI2018,
  ETTI_ETP2018,
} = {}) => ({
  aci: {
    agrement: ACI || false,
    etp: ACI_ETP2018,
    salariesInsertion: ACI_SI2018,
  },
  ai: {
    agrement: AI || false,
    etp: AI_ETP2018,
    salariesInsertion: AI_SI2018,
  },
  ei: {
    agrement: EI || false,
    etp: EI_ETP2018,
    salariesInsertion: EI_SI2018,
  },
  etti: {
    agrement: ETTI || false,
    etp: ETTI_ETP2018,
    salariesInsertion: ETTI_SI2018,
  },
});

export const useAgrementsIae = pipe(
  (siret) =>
    useQuery(agrementsIAEQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_etablissements_iae[0]")),
  mapQueryResult(formatAgrements)
);
