import { subYears, format } from "date-fns";

import utils from "../../../Utils/utils";

export default async (siren, Axios, params) => {
  return await utils
    .requestAPI(Axios, `effectifs_annuels_acoss_covid/${siren}`, params)
    .then((data) => {
      if (!data || !data.effectifs_annuels) {
        const now = new Date();
        const requestedDate = subYears(now, 1);
        const requestedYear = format(requestedDate, "yyyy");

        return {
          effectifMensuelEtp: {
            annee: requestedYear,
            effectifs_annuels: undefined,
          },
        };
      }
      return { effectifAnnuelEtp: data };
    });
};
