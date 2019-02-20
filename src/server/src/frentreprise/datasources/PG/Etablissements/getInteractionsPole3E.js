export default async (SIRET, interactionsPole3E) => {
  return interactionsPole3E.findAllBySIRET(SIRET).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      const [day, month, year] = interaction.date_visite.split("/");
      return {
        ...interaction,
        date_visite: `${year}-${month}-${day}`,
        pole: "3E"
      };
    });

    return { direccte: interactions };
  });
};
