import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getSettlement = async (SIRET, db) => {
  return await utils
    .requestAPI(Axios, `siret/${SIRET}`, params)
    .then(async data => {
      if (!data.etablissement) {
        return {};
      }
      return await helpers.formatEtab(data.etablissement, params, db);
    });
};

export default getSettlement;
