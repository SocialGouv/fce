import withAuth from "../middlewares/auth";
import Psi from "../models/Psi";
import HttpError from "../utils/HttpError";

const express = require("express");
const router = express.Router();

router.get("/psi/:siren", withAuth, async (req, res) => {
  const { siren } = req.params;

  if (!siren || siren.length !== 9) {
    const errorMessage = `Siren parameter is invalid: ${siren}`;

    return res.status(400).json({
      error: errorMessage,
    });
  }

  const psi = new Psi();

  try {
    const result = await psi.getNumberOfEmployees(siren);

    if (!result) {
      throw new HttpError();
    }

    if (result instanceof HttpError) {
      throw result;
    }

    res.json({
      result,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.status).json({
      error: e.message,
    });
  }
});

export default router;
