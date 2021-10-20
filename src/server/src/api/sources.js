import Sources from "../models/Sources";
import withAuth from "../middlewares/auth";
import { preconfiguredLimitRate } from "../middlewares/limit-rate";

const express = require("express");
const router = express.Router();

router.get("/sources", withAuth, preconfiguredLimitRate(), function(req, res) {
  const sources = new Sources();

  sources.getAll().then(sources => {
    const success = Array.isArray(sources);
    return res.send({ success, results: sources });
  });
});

export default router;
