import { getFormatedDate } from "../../Helpers";

export default ({ accords }) => {
  const accordsBySiret = accords.reduce(
    (accordsBySiret, { siret, dt_sign }) => {
      dt_sign = getFormatedDate(dt_sign);
      if (!Object.prototype.hasOwnProperty.call(accordsBySiret, siret)) {
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
};
