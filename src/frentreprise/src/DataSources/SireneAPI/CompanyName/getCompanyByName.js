import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";
import getSettlements from "../Siret/getSettlements";

const getCompanyByName = async (QUERY, Axios, params) => {
  const data = await utils.requestAPI(
    Axios,
    `siren/?q=periode(denominationUniteLegale:"${QUERY}")&nombre=10000`,
    params
  );

  if (!data.unitesLegales) {
    return [];
  }

  const out = [];
  for (let i = 0; i < data.unitesLegales.length; i++) {
    const entData = await helpers.formatEnt(data.unitesLegales[i], params);
    const settlements = await getSettlements(entData.siren, Axios, params);
    out.push({
      ...entData,
      ...settlements
    });
  }

  return out;
};

export default getCompanyByName;
