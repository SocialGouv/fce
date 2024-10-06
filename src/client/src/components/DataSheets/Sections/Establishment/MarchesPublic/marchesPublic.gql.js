import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { BCE_CLIENT } from "../../../../../services/GraphQL/GraphQL";

const marchesPublicQuery = gql`
  query getMarchesPublic($siret: String!) {
    marches: fce_marches_valides(
      where: { siret: { _eq: $siret } }
      order_by: { dateNotification: desc }
    ) {
      acheteur_id
      dateNotification
      dureeMois
      montant
      cpv_libelle
      objet
      procedure
    }
  }
`;

const etablissementQuery = gql`
  query getEtablissement($acheteurId: String!) {
    etablissement: fce_etablissements(where: { siret: { _eq: $acheteurId } }) {
      siret
      etb_raisonsociale
      codepostaletablissement
      numerovoieetablissement
      indicerepetitionetablissement
      typevoieetablissement
      complementadresseetablissement
      libellevoieetablissement
      libellecommuneetablissement
      codecommune2etablissement
      codecommuneetablissement
      libellepaysetrangeretablissement
    }
  }
`;

export const useMarchesPublicWithEtablissements = (siret) => {
  const client = useApolloClient(); // Accéder à l'instance du client Apollo
  const {
    data: marcheData,
    loading: marcheLoading,
    error: marcheError,
  } = useQuery(marchesPublicQuery, {
    context: { clientName: BCE_CLIENT },
    variables: { siret },
  });

  const [enrichedMarches, setEnrichedMarches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (marcheData && marcheData.marches.length > 0) {
      const fetchEtablissements = async () => {
        try {
          setLoading(true);
          const results = await Promise.all(
            marcheData.marches.map(async (marche) => {
              const { data: etablissementData } = await client.query({
                context: { clientName: BCE_CLIENT },
                query: etablissementQuery,
                variables: { acheteurId: marche.acheteur_id },
              });
              return {
                ...marche,
                etablissement: etablissementData.etablissement[0],
              };
            })
          );
          setEnrichedMarches(results);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };

      fetchEtablissements();
    } else {
      setLoading(false);
    }
  }, [marcheData, client]); // Ajoutez 'client' comme dépendance

  return {
    enrichedMarches,
    error: marcheError || error,
    loading: marcheLoading || loading,
  };
};
