import { getFormatedDate } from "../../Helpers";

export default ({ interactionsPoleCs }) => {
  const interactions = interactionsPoleCs.map(
    ({ siret, unite, date, etablissement }) => {
      return {
        siret: siret,
        pole: "C",
        unite: unite && unite.trim(),
        type: null,
        date: getFormatedDate(date),
        agent: null,
        note: null,
        etablissement: {
          etat_etablissement: etablissement?.etatadministratifetablissement,
          adresse_composant: {
            code_postal: etablissement?.codepostaletablissement,
            localite: etablissement?.libellecommuneetablissement,
          },
        },
      };
    }
  );

  return { interactions_C: interactions };
};
