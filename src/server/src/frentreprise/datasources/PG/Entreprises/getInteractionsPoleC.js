import { getFormatedDate } from "../Helper";

export default async (SIREN, interactionsPoleC) => {
  return interactionsPoleC.findAllBySIREN(SIREN).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(({ siret, unite, date }) => {
      return {
        siret: siret,
        pole: "C",
        unite: unite && unite.trim(),
        type: null,
        date: getFormatedDate(date),
        agent: null,
        note: null,
      };
    });

    return { interactions_C: interactions };
  });
};
