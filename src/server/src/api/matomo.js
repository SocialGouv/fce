import axios from "axios";
import qs from "query-string";

import UsersFeedback from "../models/UsersFeedback";

const express = require("express");
const router = express.Router();

router.get("/matomo/:months/:startDate", async (req, res) => {
  if (!process.env.MATOMO_ID_SITE || !process.env.MATOMO_TOKEN_AUTH) {
    console.error(
      "WARNING MATOMO: It seems matomo config in .env file is not completed"
    );
  }

  const { startDate, months } = req.params;
  const feedback = new UsersFeedback();
  const endDate = new Date().toISOString().split("T")[0];

  if (typeof startDate !== "string") {
    console.error("'startDate' parameter must be a string");
    return res.status(400).send({
      success: false,
      error: "'startDate' parameter must be a string",
    });
  }

  if (typeof months !== "string") {
    console.error("'months' parameter must be a string");
    return res.status(400).send({
      success: false,
      error: "'months' parameter must be a string",
    });
  }

  const statsParams = qs.stringify({
    module: "API",
    method: "API.get",
    idSite: process.env.MATOMO_ID_SITE,
    date: `last${parseInt(months) + 1}`,
    period: "month",
    format: "JSON",
    token_auth: process.env.MATOMO_TOKEN_AUTH,
  });

  const usersParams = qs.stringify({
    module: "API",
    method: "UserId.getUsers",
    idSite: process.env.MATOMO_ID_SITE,
    date: `${startDate},${endDate}`,
    period: "range",
    format: "JSON",
    filter_limit: "-1",
    token_auth: process.env.MATOMO_TOKEN_AUTH,
  });

  try {
    const satisfactionRatesResponse = await feedback.getSatisfactionRates(
      startDate
    );

    if (!satisfactionRatesResponse) {
      throw Error("Error: UsersFeedback get query have failed");
    }

    const satisfactionRates = satisfactionRatesResponse.filter(
      (rate) => !isNaN(parseInt(rate))
    );

    const totalRate =
      Array.isArray(satisfactionRates) &&
      satisfactionRates.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      }, 0);

    const averageRate =
      Number.isInteger(totalRate) &&
      Array.isArray(satisfactionRates) &&
      Math.round(totalRate / satisfactionRates.length);

    const stats = await axios.get(`${process.env.MATOMO_URL}?${statsParams}`);
    const users = await axios.get(`${process.env.MATOMO_URL}?${usersParams}`);

    res.send({
      ...stats.data,
      users: users.data,
      avg_satisfaction_rate: averageRate,
    });
  } catch (error) {
    console.error(
      "Matomo data can't be fetch : ",
      error.response.status,
      error.response.statusText
    );
    res.status(error.response.status || 400).send({
      success: false,
      error:
        error.response.statusText ||
        "An error was occured: Matomo data can't be fetch",
    });
  }
});

export default router;
