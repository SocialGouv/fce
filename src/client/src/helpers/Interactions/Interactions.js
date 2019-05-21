import _find from "lodash.find";
import { getLastDateInteraction } from "../Date";

export const getLastInteraction = (interactions, pole) => {
  const EEEInteractions = {};

  for (var interaction in interactions) {
    if (interaction.pole === "3E-SEER" && pole === "3E-SEER") {
      EEEInteractions.push(interaction);
    }
    if (interaction.pole === "3E-SRC" && pole === "3E-SRC") {
      EEEInteractions.push(interaction);
    }
  }

  const lastDateInteraction = getLastDateInteraction(
    EEEInteractions === undefined ? EEEInteractions : interactions,
    "YYYY-MM-DD"
  );

  return _find(interactions, { date: lastDateInteraction });
};
