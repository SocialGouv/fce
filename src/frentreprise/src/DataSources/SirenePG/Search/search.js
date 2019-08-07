import Etablissement from "../../../Models/Etablissements";
import helpers from "../Helpers/helpers";

export default async (terms, pagination, db) => {
  const etablissement = new Etablissement(db);
  const { itemsByPage, page } = pagination;
  const startIndex = itemsByPage * (page - 1);

  const etablissements = await etablissement.search(terms, {
    startIndex,
    itemsByPage
  });
  const total = await etablissement.searchCount(terms);

  if (!etablissements) {
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

  const itemsPromises = etablissements.map(
    async etab => await helpers.formatEtab(etab, null, db)
  );

  const items = await Promise.all(itemsPromises);

  return {
    items,
    pagination: {
      page,
      itemsByPage,
      pages: Math.ceil(total / itemsByPage),
      items: total,
      currentItems: items.length
    }
  };
};

const buildQuery = async terms => {
  const query = [];

  if (terms.q) {
    query.push(
      `(raisonSociale:"${terms.q}" OR nomUniteLegale:"${terms.q}" OR siren:"${
        terms.q
      }" OR siret:"${terms.q}")`
    );
  }

  if (terms.commune) {
    query.push(`codeCommuneEtablissement:${terms.commune}`);
  }

  if (terms.codePostal) {
    query.push(`codePostalEtablissement:${terms.codePostal}`);
  }

  if (terms.departement) {
    query.push(`codePostalEtablissement:${terms.departement}*`);
  }

  if (Array.isArray(terms.naf) && terms.naf.length) {
    const nafConditions = terms.naf.map(codeNaf => {
      codeNaf = [codeNaf.slice(0, 2), ".", codeNaf.slice(2)].join("");
      return `activitePrincipaleEtablissement:${codeNaf}`;
    });

    query.push(`periode(${nafConditions.join(" OR ")})`);
  }

  if (terms.siegeSocial) {
    query.push(`etablissementSiege:true`);
  }

  return query.join(" AND ");
};

const buildPagination = (startIndex, itemsByPage) => {
  const params = { tri: true, nombre: itemsByPage, debut: startIndex };

  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};
