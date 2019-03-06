import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getCompanyByName = async (QUERY, pagination, Axios, params, db) => {
  const data = await utils.requestAPI(
    Axios,
    `siret/?q=raisonSociale:"${QUERY}" OR nomUniteLegale:"${QUERY}"&nombre=10000`,
    params
  );

  const { itemsByPage, page } = pagination;
  const startIndex = itemsByPage * (page - 1);
  const endIndex = itemsByPage * page - 1;

  if (!data.etablissements || !data.etablissements[startIndex]) {
    return {
      items: [],
      pagination: {
        page,
        itemsByPage,
        pages: 0,
        items: 0
      }
    };
  }

  const out = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (!data.etablissements[i]) {
      continue;
    }
    const etabData = await helpers.formatEtab(data.etablissements[i], null, db);
    out.push(etabData);
  }

  return {
    items: out,
    pagination: {
      page,
      itemsByPage,
      pages: Math.ceil(data.etablissements.length / itemsByPage),
      items: data.etablissements.length,
      currentItems: out.length
    }
  };
};

export default getCompanyByName;
