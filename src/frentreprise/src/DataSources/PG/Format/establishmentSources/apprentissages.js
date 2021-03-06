import { getFormatedDate } from "../../Helpers";

export default ({ apprentissages }) => {
  const currentYear = new Date().getFullYear();

  const initialNbByYear = {
    [currentYear]: { signes: 0, rompus: 0 },
    [currentYear - 1]: { signes: 0, rompus: 0 },
    [currentYear - 2]: { signes: 0, rompus: 0 },
  };

  const nbApprentissage = apprentissages.reduce(
    (nbByYear, { date_debut, date_rupture }) => {
      const anneeDebut = getFormatedDate(date_debut, "yyyy");
      const anneeRupture =
        date_rupture && getFormatedDate(date_rupture, "yyyy");

      if (
        anneeDebut &&
        Object.prototype.hasOwnProperty.call(nbByYear, anneeDebut)
      ) {
        nbByYear[anneeDebut].signes++;
      }

      if (
        anneeRupture &&
        Object.prototype.hasOwnProperty.call(nbByYear, anneeRupture)
      ) {
        nbByYear[anneeRupture].rompus++;
      }

      return nbByYear;
    },
    initialNbByYear
  );

  return { apprentissage: nbApprentissage };
};
