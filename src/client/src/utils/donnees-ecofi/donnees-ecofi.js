import { pipe, prop } from "lodash/fp";

export const getDateDeclaration = prop("data.date_fin_exercice");

export const getChiffreAffaire = prop("data.ca");

export const formatChiffreAffaire = (chiffreAffaire) =>
  new Intl.NumberFormat("fr-FR", {
    currency: "EUR",
    minimumFractionDigits: 0,
    style: "currency",
  }).format(chiffreAffaire);

export const getFormattedChiffreAffaire = pipe(
  getChiffreAffaire,
  formatChiffreAffaire
);
