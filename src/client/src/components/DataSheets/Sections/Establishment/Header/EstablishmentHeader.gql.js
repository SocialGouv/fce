import { gql, useQuery } from "@apollo/client";
import { pipe, prop } from "lodash/fp";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";
import { mapQueryResult } from "../../../../../utils/graphql/graphql";

const EstablishmentHeaderQuery = gql`
  query getEstablishementHeaderData($siret: String!) {
    fce_etablissements(where: { siret: { _eq: $siret } }) {
      siret
      etablissementsiege
      numerovoieetablissement
      indicerepetitionetablissement
      typevoieetablissement
      complementadresseetablissement
      codepostaletablissement
      libellevoieetablissement
      libellecommuneetablissement
      libellepaysetrangeretablissement
      etatadministratifetablissement
      datecreationetablissement
      datedebut
      datederniertraitementetablissement
      naf: etablissements_naf {
        libelle
        code
      }
    }
  }
`;

export const useEstablishmentHeaderData = pipe(
  (siret) =>
    useQuery(EstablishmentHeaderQuery, {
      context: { clientName: BCE_CLIENT },
      variables: { siret },
    }),
  mapQueryResult(prop("fce_etablissements[0]"))
);
