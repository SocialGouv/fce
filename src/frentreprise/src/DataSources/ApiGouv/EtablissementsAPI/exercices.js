import utils from "../../../Utils/utils";

const exercices = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `exercices/${SIRET}`,
    params).then(data => {
      if (data && Array.isArray(data.exercices)) {
        const donnees_ecofi = {};
        data.exercices.forEach(decofi => {
          donnees_ecofi[
            utils.convertDate(decofi.date_fin_exercice_timestamp).toISOString()
          ] =
            +decofi.ca || null;
        });
        return { donnees_ecofi };
      }
    }
  );
};

export default exercices;
