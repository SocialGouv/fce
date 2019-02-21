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
        const { date, libelle } = data.observations[0];
        rcs.rcs_information_libelle = libelle.trim();
        rcs.rcs_information_date = date;
      }

      return rcs;
    });
};

export default infogreffe_rcs;
