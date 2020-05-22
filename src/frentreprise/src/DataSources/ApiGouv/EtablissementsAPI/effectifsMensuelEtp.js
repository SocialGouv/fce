import { subMonths, format } from "date-fns";

import { API_EFFECTIF_ETP_SUB_MONTH_BEFORE_UPDATE_DAY } from "../helpers/effectifsEtp";
import utils from "../../../Utils/utils";

export default async (siret, Axios, params) => {
  const now = new Date();

  const requestedDate = subMonths(
    now,
    API_EFFECTIF_ETP_SUB_MONTH_BEFORE_UPDATE_DAY
  );
  const requestedYear = format(requestedDate, "yyyy");
  const requestedMonth = format(requestedDate, "MM");

  return await utils
    .requestAPI(
      Axios,
      `effectifs_mensuels_acoss_covid/${requestedYear}/${requestedMonth}/etablissement/${siret}`,
      params
    )
    .then((data) => {
      if (!data || !data.effectifs_mensuels) {
        return {
          effectifMensuelEtp: {
            annee: requestedYear,
            mois: requestedMonth,
            effectifs_mensuels: undefined,
          },
        };
      }
      return { effectifMensuelEtp: data };
    });
};
