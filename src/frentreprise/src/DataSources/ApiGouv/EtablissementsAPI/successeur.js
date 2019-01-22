import utils from "../../../Utils/utils";

const successeur = async (SIRET, Axios, params) => {
  return await utils
    .requestAPI(Axios, `etablissements/${SIRET}/successeur`, params)
    .then(data => {
      if (data && data.successeur) {
        const successeur = data.successeur;

        if (successeur) {
          return {
            successeur: {
              siret: successeur.successeur_siret,
              date_transfert: utils.convertDate(
                successeur.successeur_date_etablissement
              ),
              transfert_siege: !!successeur.transfert_siege
            }
          };
        }
      }
      return {};
    });
};

export default successeur;
