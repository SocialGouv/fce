import _find from "lodash.find";
import { getLastDateInteraction } from "../Date";

export const getLastInteraction = interactions => {
  const lastDateInteraction = getLastDateInteraction(
    interactions,
    "YYYY-MM-DD"
  );

  return _find(interactions, { date: lastDateInteraction });
};
