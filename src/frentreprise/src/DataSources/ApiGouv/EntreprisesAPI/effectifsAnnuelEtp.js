import { subMonths, format } from "date-fns";

import { getSubMonthValueForApiEffectifEtp } from "../helpers/effectifsEtp";
import utils from "../../../Utils/utils";

export default async (siren, Axios, params) => {
  return await utils
    .requestAPI(Axios, `effectifs_annuels_acoss_covid/${siren}`, params)
    .then((data) => {
      return { effectifAnnuelEtp: data };
    });
};
