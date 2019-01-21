import utils from "../../../Utils/utils";

const agefiph = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `attestations_agefiph/${SIRET}`,
    params).then(data => {
      return { derniere_annee_de_conformite_connue: data.derniere_annee_de_conformite_connue || null };
    }
  );
};

export default agefiph;
