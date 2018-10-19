import utils from "../utils";

const successeur = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `etablissements/${SIRET}/successeur`,
    params,
    (out, data) => {
      if (data && data.successeur) {
        const successeur = data.successeur;

        out.successeur = {
          siret: successeur.successeur_siret,
          date_transfert: utils.convertDate(
            successeur.successeur_date_etablissement
          )
        };
      }
    }
  );
};

export default successeur;
