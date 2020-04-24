import { subMonths, format } from "date-fns";

import { getSubMonthValueForApiEffectifEtp } from "../helpers/effectifsEtp";
import utils from "../../../Utils/utils";

export default async (siret, Axios, params) => {
  const now = new Date();
  const day = now.getDate();

  const requestedDate = subMonths(now, getSubMonthValueForApiEffectifEtp(day));
  const requestedYear = format(requestedDate, "yyyy");
  const requestedMonth = format(requestedDate, "MM");

  return await utils
    .requestAPI(
      Axios,
      `effectifs_mensuels_acoss_covid/${requestedYear}/${requestedMonth}/etablissement/${siret}`,
      params
    )
    .then((data) => {
      return { effectifMensuelEtp: data };
    });
};
