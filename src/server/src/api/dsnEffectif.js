import express from "express";
// eslint-disable-next-line node/no-missing-import
import withAuth from "../middlewares/auth";
import Effectif from "../models/Effectif";
import { eachMonthOfInterval, subMonths, format } from "date-fns";
import config from "config";

const monthInitial = {
  eff: 0,
  hommes: 0,
  femmes: 0,
  cdd: 0,
  cdi: 0,
  cfi_inter: 0,
  inter_mission: 0,
  interim: 0,
};

const router = express.Router();

router.get("/dsn-effectif/:type/:identifier", withAuth, async (req, res) => {
  const { type, identifier } = req.params;
  const effectifs = new Effectif();

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

  try {
    const allYearEffectif = await effectifs.search(identifier);
    const allMonthToShow = await effectifs.fileUploadedFormMonth();

    const monthWithFile = allMonthToShow.map((row) => row.mois);
    const lastTwelveMonthsToFetch = eachMonthOfInterval({
      start: subMonths(new Date(), 12),
      end: new Date(),
    });
    const lastYearEffectif = lastTwelveMonthsToFetch
      .filter((month) =>
        monthWithFile.includes(format(month, "yyyy-MM")) ? true : false
      )
      .map((month) => {
        const formatedMonth = format(month, "yyyy-MM");
        const corespondingMonth = allYearEffectif.filter(
          (effectif) => effectif.mois === formatedMonth
        );

        if (config.get("effectif_dsn.exclude").includes(formatedMonth)) {
          return { ...monthInitial, mois: formatedMonth };
        }

        return corespondingMonth[0]
          ? corespondingMonth[0]
          : { ...monthInitial, mois: formatedMonth };
      });

    return res.send({
      success: true,
      data: lastYearEffectif,
    });
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
