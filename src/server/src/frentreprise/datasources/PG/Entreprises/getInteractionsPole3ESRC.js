import { getFormatedDate } from "../Helper";

export default async (SIREN, interactionsPole3ESEER) => {
  return interactionsPole3ESEER.findAllBySIREN(SIREN).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      return {
        siret: interaction.siret,
        date: getFormatedDate(interaction.date),
        pole: "3E_SRC",
        unite: `SRC ${interaction.region__name &&
          interaction.region__name.trim()}`,
        type: interaction.type_controle && interaction.type_controle.trim(),
        agent: null
      };
    });

    return { interactions_3E_SEER: interactions };
  });
};
