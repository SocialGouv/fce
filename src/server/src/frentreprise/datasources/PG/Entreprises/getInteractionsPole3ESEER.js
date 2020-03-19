import { getFormatedDate } from "../Helper";

export default async (SIREN, interactionsPole3ESEER) => {
  return interactionsPole3ESEER.findAllBySIREN(SIREN).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const interactions = rows.map(interaction => {
      return {
        siret: interaction.siret,
        date: getFormatedDate(interaction.date_visite),
        pole: "3E_SEER",
        unite: `Service Entreprise ${interaction.region &&
          interaction.region.trim()}`,
        type: interaction.type_suivi && interaction.type_suivi.trim(),
        agent: interaction.inspecteurs && interaction.inspecteurs.trim(),
        filiere: interaction.filieres && interaction.filieres.trim(),
        eti_pepite: interaction.suivi_eti && interaction.suivi_eti.trim()
      };
    });

    return { interactions_3E_SEER: interactions };
  });
};
