import { getFormatedDate } from "../../Helpers";

export default ({ interactionsPole3ESRCs }) => {
  const interactions = interactionsPole3ESRCs.map((interaction) => {
    return {
      siret: interaction.siret,
      date: getFormatedDate(interaction.date),
      pole: "3E_SRC",
      unite: `SRC ${
        interaction.region__name && interaction.region__name.trim()
      }`,
      type: interaction.type_controle && interaction.type_controle.trim(),
      agent: null,
    };
  });

  return { interactions_3E_SEER: interactions };
};
