import { format, parse } from "date-fns/fp";
import { pipe, prop } from "lodash/fp";

export const getDateDeclaration = pipe(
  prop("date_fin_exercice"),
  parse(new Date(), "yyyy-MM-dd"),
  format("dd/MM/yyyy")
);

const getChiffreAffaire = prop("ca");
const getMargeBrute = prop("Marge_brute");
const getEBE = prop("EBE");
const getEBIT = prop("EBIT");
const getResult = prop("Resultat_net");

const formatChiffre = (chiffreAffaire) =>
  new Intl.NumberFormat("fr-FR", {
    compactDisplay: "short",
    currency: "EUR",
    minimumFractionDigits: 0,
    notation: "compact",
  }).format(chiffreAffaire);

export const getFormattedChiffreAffaire = pipe(
  getChiffreAffaire,
  formatChiffre
);

export const getFormattedMargeBrute = pipe(getMargeBrute, formatChiffre);

export const getFormattedEBE = pipe(getEBE, formatChiffre);
export const getFormattedEBIT = pipe(getEBIT, formatChiffre);
export const getFormattedResult = pipe(getResult, formatChiffre);
