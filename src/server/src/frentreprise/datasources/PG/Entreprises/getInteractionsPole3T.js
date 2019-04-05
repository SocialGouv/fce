export default async (SIREN, interactionsPole3T) => {
  return interactionsPole3T.findAllBySIREN(SIREN).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      const [day, month, year] = interaction.date.split("/");
      return {
        siret: interaction.siret,
        pole: "T",
        unite: interaction.realise_pour && interaction.realise_pour.trim(),
        type:
          interaction.type_intervention && interaction.type_intervention.trim(),
        date: `${year}-${month}-${day}`,
        agent: interaction.intervenant && interaction.intervenant.trim(),
        note: interaction.action_sur && interaction.action_sur.trim()
      };
    });

    return { interactions_T: interactions };
  });
};
