import utils from "../../../Utils/utils";

const getSettlements = async (SIREN, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `siret/?q=siren:${SIREN}&nombre=10000`,
    params
  ).then((data) => {
   const etabs = data.etablissements.map(utils.formatEtab)

   return {
      nombre_etablissements_actifs: etabs.filter(eta => eta.actif).length,
      _ets: etabs
   };
  });
};

export default getSettlements;
