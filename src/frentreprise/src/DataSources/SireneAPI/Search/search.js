import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

export default async (terms, pagination, Axios, params, db) => {
  const data = await utils.requestAPI(
    Axios,
    `siret/?q=${await buildQuery(terms)}&nombre=10000`,
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

const buildQuery = async terms => {
  const query = [`(raisonSociale:"${terms.q}" OR nomUniteLegale:"${terms.q}")`];

  if (terms.commune) {
    query.push(`codeCommuneEtablissement:${terms.commune}`);
  }

  if (terms.codePostal) {
    query.push(`codePostalEtablissement:${terms.codePostal}`);
  }

  if (terms.departement) {
    query.push(`codePostalEtablissement:${terms.departement}*`);
  }

  if (terms.naf) {
    if (terms.naf.indexOf(".") !== 2) {
      terms.naf = [terms.naf.slice(0, 2), ".", terms.naf.slice(2)].join("");
    }
    query.push(`periode(activitePrincipaleEtablissement:${terms.naf})`);
  }

  if (terms.siegeSocial) {
    query.push(`etablissementSiege:true`);
  }

  return query.join(" AND ");
};
