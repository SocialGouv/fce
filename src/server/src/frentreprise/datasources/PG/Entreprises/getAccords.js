export default async (siren, Accords) => {
  return Accords.getBySiren(siren).then(accords => {
    if (!accords || !accords.length) {
      return {};
    }

    const accordsBySiret = accords.reduce(
      (accordsBySiret, { siret, dt_sign }) => {
        if (!accordsBySiret.hasOwnProperty(siret)) {
          accordsBySiret[siret] = { count: 0, lastDate: null };
        }

        accordsBySiret[siret].count += 1;

        if (
          !accordsBySiret[siret].lastDate ||
          accordsBySiret[siret].lastDate < dt_sign
        ) {
          accordsBySiret[siret].lastDate = dt_sign;
        }

        return accordsBySiret;
      },
      {}
    );

    return { accords: accordsBySiret };
  });
};
