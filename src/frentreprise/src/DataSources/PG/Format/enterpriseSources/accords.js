import { getFormatedDate } from "../../Helpers";

export default ({ accords }) => {
  const accordsBySiret = accords.reduce(
    (accordsBySiret, { siret, dt_sign, etablissement }) => {
      dt_sign = getFormatedDate(dt_sign);
      if (!Object.prototype.hasOwnProperty.call(accordsBySiret, siret)) {
        accordsBySiret[siret] = {
          count: 0,
          lastDate: null,
          etablissement: {
            etat_etablissement: etablissement?.etatadministratifetablissement,
            categorie_etablissement:
              etablissement?.etablissementsiege === "true"
                ? "Siège social"
                : "Établissement",
          },
        };
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
