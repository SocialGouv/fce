import utils from "../utils";

const exercices = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `exercices/${SIRET}`,
    params,
    (out, data) => {
      if (data && Array.isArray(data.exercices)) {
        out.donnees_ecofi = {};
        data.exercices.forEach(decofi => {
          out.donnees_ecofi[
            this[_convertDate](decofi.date_fin_exercice_timestamp).toISOString()
          ] =
            +decofi.ca || null;
        });
      }
    }
  );
};

export default exercices;
