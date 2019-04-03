import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getSettlements = async (SIREN, Axios, params, db) => {
  return await utils
    .requestAPI(Axios, `siret/?q=siren:${SIREN}&nombre=10000`, params)
    .then(async data => {
      if (!data.etablissements) {
        return {};
      }
      const etabs = await Promise.all(
        data.etablissements.map(
          async etab => await helpers.formatEtab(etab, params, db)
        )
      );

      return {
        nombre_etablissements_actifs: etabs.filter(eta => eta.actif).length,
        _ets: etabs
      };
    });
};

export default getSettlements;
