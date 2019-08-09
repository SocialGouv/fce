import Etablissement from "../../../Models/Etablissements";
import helpers from "../Helpers/helpers";

const getSettlement = async (SIRET, db) => {
  const etablissementModel = new Etablissement(db);

  const etablissement = await etablissementModel.getBySiret(SIRET);

  if (!etablissement) {
    return {};
  }

  return await helpers.formatEtab(etablissement);
};

export default getSettlement;
