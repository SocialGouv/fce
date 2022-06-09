import { format, parseISO } from "date-fns/fp";
import { pipe, prop } from "lodash/fp";

export const getDateDeclaration = pipe(
  prop("date_fin_exercice"),
  parseISO,
  format("dd/MM/yyyy")
);

export const getChiffreAffaire = prop("ca");

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
