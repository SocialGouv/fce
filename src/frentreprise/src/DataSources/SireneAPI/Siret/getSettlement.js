import utils from "../../../Utils/utils";

const getSettlement = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `siret/${SIRET}`,
    params
  ).then((data) => {
    if(!data.etablissement) return {};
    return utils.formatEtab(data.etablissement);
  });
};

export default getSettlement;
