import { getFormatedDate } from "../Helper";

export default async (SIREN, interactionsPole3E) => {
  return interactionsPole3E.findAllBySIREN(SIREN).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      return {
        siret: interaction.siret,
        date: getFormatedDate(interaction.date_visite),
        pole: "3E",
        unite: `Service Entreprise ${interaction.region &&
          interaction.region.trim()}`,
        type: interaction.type_suivi && interaction.type_suivi.trim(),
        agent: interaction.inspecteurs && interaction.inspecteurs.trim(),
        filiere: interaction.filieres && interaction.filieres.trim(),
        eti_pepite: interaction.suivi_eti && interaction.suivi_eti.trim()
      };
    });

    return { interactions_3E: interactions };
  });
};
