import { getFormatedDate } from "../Helper";

export default async (SIREN, apprentissage) => {
  return apprentissage.findAllBySIREN(SIREN).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    const currentYear = new Date().getFullYear();

    const initialNbByYear = {
      [currentYear]: 0,
      [currentYear - 1]: 0,
      [currentYear - 2]: 0,
    };

    const nbApprentissage = rows.reduce(
      (nbBySiretAndYear, { siret, date_debut }) => {
        const anneeDebut = getFormatedDate(date_debut, "yyyy");

        if (
          !anneeDebut ||
          !Object.prototype.hasOwnProperty.call(initialNbByYear, anneeDebut)
        ) {
          return nbBySiretAndYear;
        }

        if (!Object.prototype.hasOwnProperty.call(nbBySiretAndYear, siret)) {
          nbBySiretAndYear[siret] = { siret, signes: { ...initialNbByYear } };
        }

        nbBySiretAndYear[siret].signes[anneeDebut]++;

        return nbBySiretAndYear;
      },
      {}
    );

    return { apprentissage: Object.values(nbApprentissage) };
  });
};
