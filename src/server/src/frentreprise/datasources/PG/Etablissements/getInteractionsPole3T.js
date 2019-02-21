export default async (SIRET, interactionsPole3T) => {
  return interactionsPole3T.findAllBySIRET(SIRET).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      const [day, month, year] = interaction.date.split("/");
      return {
        pole: "3T",
        unite: interaction.realise_pour.trim(),
        type: interaction.type_intervention.trim(),
        date: `${year}-${month}-${day}`,
        agent: interaction.intervenant.trim(),
        note: interaction.action_sur.trim()
      };
    });

    return { interactions_3T: interactions };
  });
};
