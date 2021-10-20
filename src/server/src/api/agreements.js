import withAuth from "../middlewares/auth";
import Agreement from "../models/Agreement";
import HttpError from "../utils/HttpError";
import { preconfiguredLimitRate } from "../middlewares/limit-rate";

const express = require("express");
const router = express.Router();

router.get("/agreements/:siren", withAuth, preconfiguredLimitRate(), async (req, res) => {
  const { siren } = req.params;

  if (!siren || siren.length !== 9) {
    const errorMessage = `siren parameter is invalid: ${siren}`;

    return res.status(400).json({
      error: errorMessage,
    });
  }

  const agreement = new Agreement();

  try {
    const result = await agreement.findAllBySIREN(siren);

    if (!result) {
      throw new HttpError();
    }

    if (result instanceof HttpError) {
      throw result;
    }

    res.json({ agreements: result || [] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
    });
  }
});

export default router;
