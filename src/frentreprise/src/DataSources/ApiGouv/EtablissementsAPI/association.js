import utils from "../../../Utils/utils";

const association = async (SIRET, Axios, params) => {
  return await utils
    .requestAPI(Axios, `associations/${SIRET}`, params)
    .then(data => {
      if (
        data.association &&
        typeof data.association === "object" &&
        data.association.etat &&
        data.association.id
      ) {
        return { association: data.association };
      }
    });
};

export default association;
