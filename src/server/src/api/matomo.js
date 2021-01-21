import axios from "axios";
import qs from "query-string";

import withAuth from "../middlewares/auth";
import UsersFeedback from "../models/UsersFeedback";
import { isDev } from "../utils/isDev";

const express = require("express");
const router = express.Router();

router.get("/matomo/:date/:range", withAuth, async (req, res) => {
  const feedback = new UsersFeedback();

  const params = qs.stringify({
    module: "API",
    method: "API.get",
    idSite: process.env.MATOMO_ID_SITE,
    date: req.params.date,
    period: req.params.range,
    format: "JSON",
    token_auth: process.env.MATOMO_TOKEN_AUTH,
  });

  /*
   * //////////////////////
   * // TODO:
   * // A VIRER ET UTILISER 2 ENV :
   * // NODE_TLS_REJECT_UNAUTHORIZED A ACTIVER POUR PROD ET DESACTIVER POUR DEV
   * //////////////////////
   */
  if (isDev) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  }

  try {
    const satisfactionRates = await feedback.getSatisfactionRates();
    const totalRate = satisfactionRates.reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0);
    const averageRate = Math.round(totalRate / satisfactionRates.length);

    try {
      const { data } = await axios.get(`${process.env.MATOMO_URL}?${params}`);
      res.send({ ...data, avg_satisfaction_rate: averageRate });
    } catch (error) {
      console.error({ error });

      res.status(error.response.status || 400).send({
        success: false,
        error: error.response.statusText,
      });
    }
    throw new Error("An error has occured: Matomo data can't be fetch");
  } catch (e) {
    console.error("An error has occured", e);
  }
});

export default router;
