import Etablissement from "../../../Models/Etablissements";
import helpers from "../Helpers/helpers";

const getSettlements = async (SIREN, db) => {
  const etablissementModel = new Etablissement(db);

  const etablissements = await etablissementModel.findBySiren(SIREN);

  if (!etablissements) {
    return {};
  }

  const etabs = await Promise.all(
    etablissements.map(async etab => await helpers.formatEtab(etab))
  );

  return {
    nombre_etablissements_actifs: etabs.filter(eta => eta.actif).length,
    _ets: etabs
  };
};

export default getSettlements;
