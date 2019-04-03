import utils from "../../../Utils/utils";

const attestation_dgfip = async (SIREN, Axios, params) => {
  return await utils
    .requestAPI(Axios, `attestations_fiscales_dgfip/${SIREN}`, params)
    .then(data => {
      if (data && data.url) {
        if (typeof data.url === "string" && data.url.length) {
          return { attestation_dgfip: data.url };
        }
      }
      return {};
    });
};

export default attestation_dgfip;
