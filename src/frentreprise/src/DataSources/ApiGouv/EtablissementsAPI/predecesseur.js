import utils from "../../../Utils/utils";

const predecesseur = async (SIRET, Axios, params) => {
  return await utils
    .requestAPI(Axios, `etablissements/${SIRET}/predecesseur`, params)
    .then(data => {
      if (data && data.predecesseur) {
        const predecesseur = data.predecesseur;

        if (predecesseur) {
          return {
            predecesseur: {
              siret: predecesseur.predecesseur_siret,
              date_transfert: utils.convertDate(
                predecesseur.predecesseur_date_etablissement
              )
            }
          };
        }
      }
    });
};

export default predecesseur;
