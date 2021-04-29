import _order from "lodash.orderby";
import { subMonths, format } from "date-fns";

import utils from "../../../Utils/utils";

export const API_EFFECTIF_ETP_LIMIT = 3;
export const API_EFFECTIF_ETP_TRY_MONTHS = 5;
export const API_EFFECTIF_ETP_DAY_OF_MONTH_UPDATE = 15;
export const API_EFFECTIF_ETP_SUB_MONTH_AFTER_UPDATE_DAY = 2;
export const API_EFFECTIF_ETP_SUB_MONTH_BEFORE_UPDATE_DAY = 3;

export const getSubMonthValueForApiEffectifEtp = (dayOfMonth) =>
  dayOfMonth >= API_EFFECTIF_ETP_DAY_OF_MONTH_UPDATE
    ? API_EFFECTIF_ETP_SUB_MONTH_AFTER_UPDATE_DAY
    : API_EFFECTIF_ETP_SUB_MONTH_BEFORE_UPDATE_DAY;

export const extractLastEffectifs = (effectifs) =>
  _order(effectifs, ["annee", "mois"], ["desc", "desc"]).slice(
    0,
    API_EFFECTIF_ETP_LIMIT
  );

export const getEffectifsMensuel = (Axios, params, type, identifier) => {
  const now = new Date();

  const apiCalls = [];
  const effectifs = [];

  for (
    let subMonthValue = 1;
    subMonthValue <= API_EFFECTIF_ETP_TRY_MONTHS;
    subMonthValue++
  ) {
    const requestedDate = subMonths(now, subMonthValue);
    const requestedYear = format(requestedDate, "yyyy");
    const requestedMonth = format(requestedDate, "MM");

    const apiCall = utils
      .requestAPI(
        Axios,
        `effectifs_mensuels_acoss_covid/${requestedYear}/${requestedMonth}/${type}/${identifier}`,
        params
      )
      .then((data) => {
        if (!data?.effectifs_mensuels) {
          return null;
        }

        effectifs.push(data);
      });

    apiCalls.push(apiCall);
  }

  return Promise.all(apiCalls)
    .then(() => ({
      effectifMensuelEtp: extractLastEffectifs(effectifs),
    }))
    .catch(() => ({
      effectifMensuelEtp: extractLastEffectifs(effectifs),
    }));
};
