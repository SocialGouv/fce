import { getFormatedDate } from "../../Helpers";

export default ({ interactionsPoleCs }) => {
  const interactions = interactionsPoleCs.map(({ siret, unite, date }) => {
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
};
