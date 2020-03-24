import { getFormatedDate } from "../Helper";

export default async (SIRET, interactionsPole3ESRC) => {
  return interactionsPole3ESRC.findAllBySIRET(SIRET).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      return {
        date: getFormatedDate(interaction.date),
        pole: "3E_SRC",
        unite: `SRC ${interaction.region__name &&
          interaction.region__name.trim()}`,
        type: interaction.type_controle && interaction.type_controle.trim(),
        agent: null
      };
    });

    return { interactions_3E_SRC: interactions };
  });
};
