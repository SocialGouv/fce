import { getFormatedDate } from "../../Helpers";

export default ({ interactionsPoleCs }) => {
  const interactions = interactionsPoleCs.map(({ unite, date }) => {
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
};
