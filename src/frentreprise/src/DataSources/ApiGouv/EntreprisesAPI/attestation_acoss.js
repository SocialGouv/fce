import utils from "../../../Utils/utils";

const attestation_acoss = async (SIREN, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `attestations_sociales_acoss/${SIREN}`,
    params).then((data) => {
      if (data && data.url) {
        if (typeof data.url === "string" && data.url.length) {
          return { attestation_acoss: data.url };
        }
      }
    }
  );
};

export default attestation_acoss;
