import utils from "../utils";

const association = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `associations/${SIRET}`,
    params,
    async (out, data) => {
      if (
        data.association &&
        typeof data.association === "object" &&
        data.association.etat
      ) {
        out.association = data.association;
      }
    }
  );
};

export default association;
