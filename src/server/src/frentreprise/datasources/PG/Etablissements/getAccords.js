export default async (SIRET, Accords) => {
  return Accords.getBySIRET(SIRET).then(accords => {
    if (!accords || !accords.length) {
      return {};
    }

    const totalAccords = accords.reduce(
      (acc, accord) => {
        Object.entries(accord).forEach(([key, value]) => {
          if (
            acc.hasOwnProperty(key) &&
            typeof value === "number" &&
            value > 0
          ) {
            acc[key].count += value;

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
      lastDate: Object.values(accords).reduce(
        (lastDate, { dt_sign }) =>
          !lastDate || lastDate < dt_sign ? dt_sign : lastDate,
        null
      )
    };

    return { accords: totalAccords };
  });
};
