import utils from "../utils";

const predecesseur = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `etablissements/${SIRET}/predecesseur`,
    params,
    (out, data) => {
      if (data && data.predecesseur) {
        const predecesseur = data.predecesseur;

        out.predecesseur = {
          siret: predecesseur.predecesseur_siret,
          date_transfert: utils.convertDate(
            predecesseur.predecesseur_date_etablissement
          )
        };
      }
    }
  );
};

export default predecesseur;
