import { format, parse } from "date-fns/fp";
import { pipe, prop } from "lodash/fp";

import { getDateYear } from "../../helpers/Date";

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

export const formatChiffre = (chiffreAffaire) => {
  if (chiffreAffaire !== 0 && !chiffreAffaire) return "-";
  if (chiffreAffaire === null) return null;
  return new Intl.NumberFormat("fr-FR", {
    compactDisplay: "short",
    currency: "EUR",
    minimumFractionDigits: 0,
    notation: "compact",
  }).format(chiffreAffaire);
};

export const getFormattedChiffreAffaire = pipe(
  getChiffreAffaire,
  formatChiffre
);

export const getFormattedMargeBrute = pipe(getMargeBrute, formatChiffre);

export const getFormattedEBE = pipe(getEBE, formatChiffre);
export const getFormattedEBIT = pipe(getEBIT, formatChiffre);
export const getFormattedResult = pipe(getResult, formatChiffre);
export const sortedData = (data) =>
  data
    ?.sort((a, b) => {
      return new Date(b.date_fin_exercice) - new Date(a.date_fin_exercice);
    })
    .slice(0, 5);

export const sortedDataAsc = (data) =>
  data?.sort((a, b) => {
    return new Date(a.date_fin_exercice) - new Date(b.date_fin_exercice);
  });

export const concatApiEntrepriseBceData = (
  donneesEcofiBce,
  donneesEcofiApi
) => {
  const donneesEcofi = [...donneesEcofiBce];
  const yearsEcofiBce = [
    ...new Set(
      donneesEcofiBce.map((obj) => getDateYear(obj.date_fin_exercice))
    ),
  ];

  let filteredDonneesEcofiApi = [];
  if (yearsEcofiBce?.length > 0 && donneesEcofiApi?.length > 0)
    filteredDonneesEcofiApi = donneesEcofiApi
      ?.map((obj) => {
        if (!yearsEcofiBce.includes(getDateYear(obj?.data?.date_fin_exercice)))
          return {
            ...obj.data,
            EBE: null,
            EBIT: null,
            Marge_brute: null,
            Resultat_net: null,
            isFromApiEntreprise: true,
          };
        return;
      })
      .filter(Boolean);

  const donneeEcofi = [...donneesEcofi, ...filteredDonneesEcofiApi];
  return donneeEcofi;
};
