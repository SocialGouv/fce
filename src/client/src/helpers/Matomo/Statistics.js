import _omit from "lodash.omit";

export const sum = (array) =>
  array.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b);
  }, 0);

export const extractStats = (data) =>
  _omit(data, "avg_satisfaction_rate", "users");

/*
 * Retourne la moyenne globale en minute de toutes
 * les moyennes de temps passé sur le site
 */
export const getAverageRateTimeOnSite = (rateTimeOnSitePerMonth, months) =>
  Math.round(sum(rateTimeOnSitePerMonth) / months / 60);

/*
 * Retourne la médiane des moyennes de retours utilisateurs
 */
export const nbUsersReturningAverage = (nbUsersList, nbUsersReturningList) => {
  // Liste des moyennes en pourcentage pour chaque mois
  // Retourne 0 si NaN
  const nbUsersReturningAveragePerMonth = nbUsersList.map(
    (nbUsers, key) =>
      parseFloat((100 * (nbUsersReturningList[key] / nbUsers)).toFixed(1)) || 0
  );

  // Faire une mediane globale des moyennes de chaque mois
  // Il faut exclure les moyennes à 0 de la division pour ne pas fausser le résultat
  const totalNbUsersReturningAverage = parseFloat(
    sum(nbUsersReturningAveragePerMonth) /
      nbUsersReturningAveragePerMonth.filter((average) => average !== 0).length
  ).toFixed(1);

  return totalNbUsersReturningAverage;
};
