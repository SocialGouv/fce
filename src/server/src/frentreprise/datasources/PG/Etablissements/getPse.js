import { getFormatedDate } from "../Helper";

export default async (SIRET, rows) => {
  return rows.getBySIRET(SIRET).then(pseRows => {
    if (!pseRows || !pseRows.length) {
      return {};
    }

    const pse = pseRows.map(pseRow => {
      Object.entries(pseRow).forEach(([key, value]) => {
        if (typeof pseRow[key] === "string") {
          pseRow[key] = pseRow[key].trim();
        }
      });

      pseRow.date_d_enregistrement = getFormatedDate(
        pseRow.date_d_enregistrement
      );

      return pseRow;
    });

    return {
      pse
    };
  });
};
