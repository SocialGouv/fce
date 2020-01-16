import { getFormatedDate } from "../Helper";

export default async (SIRET, Accords) => {
  return Accords.getBySIRET(SIRET).then(accords => {
    if (!accords || !accords.length) {
      return {};
    }

    const totalAccords = accords.reduce(
      (acc, accord) => {
        accord.dt_sign = getFormatedDate(accord.dt_sign);

        Object.entries(accord).forEach(([key, value]) => {
          if (
            acc.hasOwnProperty(key) &&
            typeof value === "number" &&
            value > 0
          ) {
            acc[key].count += 1;

            if (!acc[key].lastDate || acc[key].lastDate < accord.dt_sign) {
              acc[key].lastDate = accord.dt_sign;
            }
          }
        });
        return acc;
      },
      {
        autres: { count: 0, lastDate: null },
        classifications: { count: 0, lastDate: null },
        conditions_travail: { count: 0, lastDate: null },
        droit_syndical: { count: 0, lastDate: null },
        egalite_pro: { count: 0, lastDate: null },
        emploi: { count: 0, lastDate: null },
        epargne: { count: 0, lastDate: null },
        formation: { count: 0, lastDate: null },
        nouvelles_technologies: { count: 0, lastDate: null },
        protection_sociale: { count: 0, lastDate: null },
        remuneration: { count: 0, lastDate: null },
        temps_travail: { count: 0, lastDate: null }
      }
    );

    totalAccords.total = {
      count: accords.length,
      lastDate: Object.values(totalAccords).reduce(
        (lastDateFinal, { lastDate }) =>
          !lastDateFinal || lastDateFinal < lastDate ? lastDate : lastDateFinal,
        null
      )
    };

    return { accords: totalAccords };
  });
};
