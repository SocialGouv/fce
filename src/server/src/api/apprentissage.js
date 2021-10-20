import { Router } from "express";
import withAuth from "../middlewares/auth";
import Apprentissage from "../models/Apprentissage";
import { getYear, parseISO } from "date-fns";
import { preconfiguredLimitRate } from "../middlewares/limit-rate";

const apprentissage = Router();

const isSiren = (str) => str.match(/^[0-9]{9}$/);
const isSiret = (str) => str.match(/^[0-9]{14}$/);

apprentissage.get("/apprentissage/:id", withAuth, preconfiguredLimitRate(), async (req, res) => {
  const { id } = req.params;

  if (!isSiret(id) && !isSiren(id)) {
    res.code(400)
      .json({
        message: "Resource identifier is neither a SIRET or a SIREN"
      });
    return;
  }

  const apprentissage = new Apprentissage();

  const apprentissageData = await (isSiren(id) ? apprentissage.getBySiren(id) : apprentissage.getBySiret(id));

  const apprentissageMaxYear = await apprentissage.getMaxYear();

  const apprentissageDefault = {
    [apprentissageMaxYear]: { signes: 0, rompus: 0 },
    [apprentissageMaxYear - 1]: { signes: 0, rompus: 0 },
    [apprentissageMaxYear - 2]: { signes: 0, rompus: 0 },
  };

  const compactApprentissageData = apprentissageData.reduce((acc, apprentissage) => {
    const signYear = getYear(parseISO(apprentissage.date_debut));

    acc[signYear].signes ++;

    if (apprentissage.date_rupture) {
      const breakYear = getYear(parseISO(apprentissage.date_rupture));
      acc[breakYear].rompus ++;
    }

    return acc;
  }, apprentissageDefault)


  res.json(compactApprentissageData);
})

export default apprentissage;
