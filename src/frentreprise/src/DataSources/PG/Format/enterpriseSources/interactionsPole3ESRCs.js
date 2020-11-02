import { getFormatedDate } from "../../Helpers";

export default ({ interactionsPole3ESRCs }) => {
  console.log("Debug compilation")
  const interactions = interactionsPole3ESRCs.map((interaction) => {
    return {
      siret: interaction.siret,
      date: getFormatedDate(interaction.date),
      pole: "3E_SRC",
      unite: `SRC ${
        interaction.libelle_region && interaction.libelle_region.trim()
      }`,
      type: interaction.type_controle && interaction.type_controle.trim(),
      agent: null,
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

  return { interactions_3E_SRC: interactions };
};
