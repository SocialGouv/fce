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
export const sortedData = (data) => {
  if (!data || data?.length === 0) return null;
  return data
    ?.sort((a, b) => {
      return new Date(b?.date_fin_exercice) - new Date(a?.date_fin_exercice);
    })
    .slice(0, 5);
};

export const sortedDataAsc = (data) => {
  if (!data || data?.length === 0) return null;
  return data?.slice(0, 5)?.sort((a, b) => {
    return new Date(a?.date_fin_exercice) - new Date(b?.date_fin_exercice);
  });
};
export const sortedApiData = (data) => {
  if (!data || data?.length === 0) return null;

  return data
    ?.sort((a, b) => {
      return (
        new Date(b?.date_fin_exercice) - new Date(a?.data?.date_fin_exercice)
      );
    })
    .slice(0, 5);
};

export const sortedApiDataAsc = (data) => {
  if (!data || data?.length === 0) return null;

  const sortedData = [...data];
  sortedData.sort((a, b) => {
    const dateA = new Date(a.data.date_fin_exercice);
    const dateB = new Date(b.data.date_fin_exercice);
    return dateA - dateB;
  });

  return sortedData.slice(0, 5);
};
export const concatDataDistinct = (concatData, filteredDonneesEcofiApi) => {
  filteredDonneesEcofiApi.forEach((objet2) => {
    const dateExercice = getDateYear(objet2.date_fin_exercice);

    const estPresent = concatData.some(
      (objet1) => getDateYear(objet1.date_fin_exercice) == dateExercice
    );

    if (!estPresent) {
      concatData.push(objet2);
    }
  });

  return concatData;
};

export const concatApiEntrepriseBceData = (
  donneesEcofiBce,
  donneesEcofiApi
) => {
  const yearsEcofiBce = [
    ...new Set(
      donneesEcofiBce.map((obj) => getDateYear(obj.date_fin_exercice))
    ),
  ];

  let filteredDonneesEcofiApi = [];
  if (yearsEcofiBce?.length > 0 && donneesEcofiApi?.length > 0)
    filteredDonneesEcofiApi = donneesEcofiApi
      ?.map((obj) => {
        const caBce = donneesEcofiBce.find(
          (item) =>
            new Date(item.date_fin_exercice).getYear() ===
            new Date(obj?.data?.date_fin_exercice).getYear()
        );
        if (
          !yearsEcofiBce.includes(getDateYear(obj?.data?.date_fin_exercice))
        ) {
          return {
            ...obj.data,
            EBE: null,
            EBIT: null,
            Marge_brute: null,
            Resultat_net: null,
            isFromApiEntreprise: true,
          };
        }
        if (yearsEcofiBce.includes(getDateYear(obj?.data?.date_fin_exercice))) {
          return {
            EBE: caBce?.EBE,
            EBIT: caBce?.EBIT,
            Marge_brute: caBce?.Marge_brute,
            Resultat_net: caBce?.Resultat_net,
            ca: caBce?.ca == 0 ? obj.data.ca : caBce?.ca,
            date_fin_exercice: obj?.data?.date_fin_exercice,
            isFromApiEntreprise: caBce?.ca == 0 ? true : false,
          };
        }
        return;
      })
      .filter(Boolean);
  concatDataDistinct(filteredDonneesEcofiApi, donneesEcofiBce);
  return filteredDonneesEcofiApi;
};
