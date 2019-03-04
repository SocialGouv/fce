import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";
import getSettlements from "../Siret/getSettlements";

const getCompanyByName = async (QUERY, pagination, Axios, params) => {
  const data = await utils.requestAPI(
    Axios,
    `siren/?q=periode(denominationUniteLegale:"${QUERY}")&nombre=10000`,
    params
  );

  const { itemsByPage, page } = pagination;
  const startIndex = itemsByPage * (page - 1);
  const endIndex = itemsByPage * page - 1;

  console.log("////", startIndex, endIndex);

  if (!data.unitesLegales || !data.unitesLegales[startIndex]) {
    return [];
  }

  const out = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (!data.unitesLegales[i]) {
      continue;
    }
    const entData = await helpers.formatEnt(data.unitesLegales[i]);
    const settlements = await getSettlements(
      entData.siren,
      Axios,
      params,
      true
    );
    out.push({
      ...entData,
      ...settlements
    });
  }

  return out;
};

export default getCompanyByName;
