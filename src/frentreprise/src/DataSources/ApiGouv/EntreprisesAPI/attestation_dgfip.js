import utils from "../utils";

const attestation_dgfip = async (SIREN, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `attestations_fiscales_dgfip/${SIREN}`,
    params,
    (out, data) => {
      if (data && data.url) {
        if (typeof data.url === "string" && data.url.length) {
          out.attestation_dgfip = data.url;
        }
      }
    }
  );
};

export default attestation_dgfip;
