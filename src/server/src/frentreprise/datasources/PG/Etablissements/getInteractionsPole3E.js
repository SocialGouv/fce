export default async (SIRET, interactionsPole3E) => {
  return interactionsPole3E.findAllBySIRET(SIRET).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      const [day, month, year] = interaction.date_visite.split("/");
      return {
        date: `${year}-${month}-${day}`,
        pole: "3E",
        unite: `Service Entreprise ${interaction.region.trim()}`,
        type: interaction.type_suivi.trim(),
        agent: interaction.inspecteurs.trim(),
        filiere: interaction.filieres.trim(),
        eti_pepite: interaction.suivi_eti.trim()
      };
    });

    return { interactions_3E: interactions };
  });
};
