import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getSettlement = async (SIRET, Axios, params) => {
  return await utils.requestAPI(Axios, `siret/${SIRET}`, params).then(data => {
    if (!data.etablissement) {
      return {};
    }
    return helpers.formatEtab(data.etablissement);
  });
};

export default getSettlement;
