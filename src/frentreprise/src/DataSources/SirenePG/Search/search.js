import Etablissement from "../../../Models/Etablissements";
import helpers from "../Helpers/helpers";

export default async (terms, pagination, db) => {
  const etablissement = new Etablissement(db);
  const page = pagination && pagination.page
  const itemsByPage = pagination && pagination.itemsByPage

  const limit = pagination && {
    itemsByPage: itemsByPage,
    startIndex: itemsByPage * (page - 1)
  };

  const etablissements = await etablissement.search(terms, limit);
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
