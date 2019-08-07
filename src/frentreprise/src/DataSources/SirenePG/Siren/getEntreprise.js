import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getEntreprise = async (SIREN, db) => {
  return await utils
    .requestAPI(Axios, `siren/${SIREN}`, params)
    .then(async data => {
      if (!data.uniteLegale) {
        return {};
      }

      return await helpers.formatEnt(data.uniteLegale, params, db);
    });
};

export default getEntreprise;
