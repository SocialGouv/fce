import utils from "../utils";

const agefiph = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `attestations_agefiph/${SIRET}`,
    params,
    (out, data) => {
      out.agefiph_derniere_annee_conformite_connue =
        data.derniere_annee_de_conformite_connue || null;
    }
  );
};

export default agefiph;
