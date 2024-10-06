import { useMemo, useState } from "react";

import { formatSiret } from "../../../../../helpers/utils";
import { formatUpperCase } from "../../../../../utils/entreprise/entreprise";

// Suppose this function is imported or defined
export const getCity = (marche) =>
  marche?.etablissement?.libellecommuneetablissement ||
  marche?.etablissement?.libellecommune2etablissement;
export const getAcheteur = (marche) =>
  formatUpperCase(marche?.etablissement?.etb_raisonsociale) ||
  formatSiret(marche?.acheteur_id);

export const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;

        // Check if the key is "city" and use getCity function
        if (sortConfig.key === "city") {
          aValue = getCity(a); // Retrieve city using getCity
          bValue = getCity(b);
        } else if (sortConfig.key === "acheteur") {
          aValue = getAcheteur(a);
          bValue = getAcheteur(b);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        console.log(aValue, bValue, a, b);

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ direction, key });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
