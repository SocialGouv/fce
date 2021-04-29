import { getFormatedDate } from "../../Helpers";

export default ({ interactionsPoleTs }) => {
  const interactions = interactionsPoleTs.map((interaction) => {
    return {
      siret: interaction.siret,
      pole: "T",
      unite: interaction.realise_pour && interaction.realise_pour.trim(),
      type:
        interaction.type_intervention && interaction.type_intervention.trim(),
      date: getFormatedDate(interaction.date),
      agent: interaction.intervenant && interaction.intervenant.trim(),
      note: interaction.action_sur && interaction.action_sur.trim(),
      etablissement: {
        etat_etablissement:
          interaction?.etablissement?.etatadministratifetablissement,
        adresse_composant: {
          code_postal: interaction?.etablissement?.codepostaletablissement,
          localite: interaction?.etablissement?.libellecommuneetablissement,
        },
      },
    };
  });

  return { interactions_T: interactions };
};
