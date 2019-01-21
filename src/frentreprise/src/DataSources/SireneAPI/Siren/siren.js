import utils from "../../../Utils/utils";

const getEntreprise = async (SIREN, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `entreprises/${SIREN}`,
    params
  ).then((data) => {
    const out = {};

    Object.assign(out, data.uniteLegale);

    return out;
  });
};

export default getEntreprise;
