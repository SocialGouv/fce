import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getEntreprise = async (SIREN, Axios, params) => {
  return await utils.requestAPI(Axios, `siren/${SIREN}`, params).then(data => {
    if (!data.uniteLegale) {
      return false;
    }

    return helpers.formatEnt(data.uniteLegale);
  });
};

export default getEntreprise;
