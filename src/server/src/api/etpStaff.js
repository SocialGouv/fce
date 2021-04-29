import express from "express";
import { eachMonthOfInterval, format } from "date-fns";
// eslint-disable-next-line node/no-missing-import
import frentreprise from "frentreprise";
import withAuth from "../middlewares/auth";

const router = express.Router();

router.get("/etp-staff/:type/:identifier", withAuth, (req, res) => {
  const { type, identifier } = req.params;

  if (!type || typeof type !== "string") {
    console.error("'type' parameter is mandatory and must be a string");
    return res.status(400).send({
      success: false,
      error: "'type' parameter is mandatory and must be a string",
    });
  }

  if (!identifier || typeof identifier !== "string") {
    console.error("'identifier' parameter is mandatory and must be a string");
    return res.status(400).send({
      success: false,
      error: "'identifier' parameter is mandatory and must be a string",
    });
  }

  const monthsToFetchSinceApiStart = eachMonthOfInterval({
    start: new Date(2020, 1),
    end: new Date(),
  });

  const source = frentreprise.getDataSource("ApiGouv").source;
  const axios =
    source[
      Object.getOwnPropertySymbols(source).find(
        (s) => String(s) === "Symbol(_axios)"
      )
    ];

  const apiCalls = monthsToFetchSinceApiStart.map((date) =>
    axios(
      `effectifs_mensuels_acoss_covid/${format(date, "yyyy")}/${format(
        date,
        "MM"
      )}/${req.params.type}/${req.params.identifier}`,
      {
        ...source.axiosConfig,
        params: {
          token: source.token,
          context: "Tiers",
          recipient: "Direccte Occitanie",
          object: "FCEE - Direccte Occitanie",
        },
      }
    )
      .then((res) => res.data)
      .catch((error) => {
        console.error(
          `
          ${error.message} : Effectifs mensuels ETP ${format(
            date,
            "MM"
          )}/${format(date, "yyyy")}
          URL: ${error.config.url}
          `
        );
        return null;
      })
  );

  return Promise.all(apiCalls).then((results) => {
    const availableMonths = results.filter((month) => !!month);
    return res.send(availableMonths);
  });
});

export default router;
