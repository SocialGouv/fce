import { getFormatedDate } from "../../Helpers";

export default ({ interactionsPole3ESRCs }) => {
  const interactions = interactionsPole3ESRCs.map((interaction) => {
    return {
      date: getFormatedDate(interaction.date),
      pole: "3E_SRC",
      unite: `SRC ${
        interaction.libelle_region && interaction.libelle_region.trim()
      }`,
      type: interaction.type_controle && interaction.type_controle.trim(),
      nature: interaction.nature_controle && interaction.nature_controle.trim(),
      cible: interaction.cible_controle && interaction.cible_controle.trim(),
      agent: null,
    };
  });

  return { interactions_3E_SRC: interactions };
};
