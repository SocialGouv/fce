import utils from "../../../Utils/utils";

const infogreffe_rcs = async (SIREN, Axios, params) => {
  return await utils
    .requestAPI(Axios, `extraits_rcs_infogreffe/${SIREN}`, params)
    .then(data => {
      if (typeof data !== "object" || !data.siren) {
        return {};
      }

      const rcs = {
        rcs_date_immatriculation: data.date_immatriculation
      };

      if (Array.isArray(data.observations) && data.observations.length) {
        rcs.rcs_observations = data.observations.map(({ libelle, date }) => ({
          date,
          libelle: libelle.trim()
        }));
      }

      return rcs;
    });
};

export default infogreffe_rcs;
