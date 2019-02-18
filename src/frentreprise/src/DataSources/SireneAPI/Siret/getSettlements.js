import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getSettlements = async (SIREN, Axios, params) => {
  return await utils
    .requestAPI(Axios, `siret/?q=siren:${SIREN}&nombre=10000`, params)
    .then(data => {
      const etabs = data.etablissements
        ? data.etablissements.map(helpers.formatEtab)
        : [];

      return {
        nombre_etablissements_actifs: etabs.filter(eta => eta.actif).length,
        _ets: etabs
      };
    });
};

export default getSettlements;
