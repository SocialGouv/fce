import { getFormatedDate } from "../Helper";

export default async (SIRET, interactionsPoleC) => {
  return interactionsPoleC.findAllBySIRET(SIRET).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(({ unite, date }) => {
      return {
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
