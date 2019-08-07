import Entreprises from "../../../Models/Entreprises";
import helpers from "../Helpers/helpers";

const getEntreprise = async (SIREN, db) => {
  const entreprisesModel = new Entreprises(db);

  const entreprise = await entreprisesModel.getBySiren(SIREN);

  if (!entreprise) {
    return {};
  }

  return await helpers.formatEnt(entreprise);
};

export default getEntreprise;
