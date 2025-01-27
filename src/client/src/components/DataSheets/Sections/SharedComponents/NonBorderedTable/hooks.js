import { useMemo, useState } from "react";

import { formatSiret } from "../../../../../helpers/utils";
import { formatUpperCase } from "../../../../../utils/entreprise/entreprise";
import { getCodePostal } from "../../../../../utils/establishment/establishment";

export const getCity = (marche) =>
  marche?.etablissement?.libellecommuneetablissement ||
  marche?.etablissement?.libellecommune2etablissement;
export const getAcheteur = (marche) =>
  formatUpperCase(marche?.etablissement?.etb_raisonsociale) ||
  formatSiret(marche?.acheteur_id);

export const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...(items || [])];
    if (items && sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;

        // Check if the key is "city" and use getCity function
        if (sortConfig.key === "city") {
          aValue = getCodePostal(a?.etablissement); // Retrieve city using getCity
          bValue = getCodePostal(b?.etablissement);
        } else if (sortConfig.key === "acheteur") {
          aValue = getAcheteur(a);
          bValue = getAcheteur(b);
        } else if (
          sortConfig.key === "montant" ||
          sortConfig.key === "dureeMois"
        ) {
          // Convertir 'montant' en nombre
          aValue = parseFloat(a[sortConfig.key]);
          bValue = parseFloat(b[sortConfig.key]);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        // Gérer les valeurs nulles ou indéfinies
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        // Comparaison appropriée en fonction du type
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        } else {
          if (aValue < bValue) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
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
