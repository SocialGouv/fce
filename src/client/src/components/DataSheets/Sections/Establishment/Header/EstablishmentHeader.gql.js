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
const EstablishmentStateNum = gql`
  query SidebarQuery($siren: String!) {
    state_num: fce_entreprise_nbr_etablissements(
      where: { siren: { _eq: $siren } }
    ) {
      nb_eta
      nb_eta_fermes
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
export const useEstablishmentHeaderNumData = pipe(
  (siren) =>
    useQuery(EstablishmentStateNum, {
      context: { clientName: BCE_CLIENT },
      variables: { siren },
    }),
  mapQueryResult(prop("state_num[0]"))
);
