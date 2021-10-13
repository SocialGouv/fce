import Sources from "../models/Sources";
import withAuth from "../middlewares/auth";
import {limitRate} from "../middlewares/limit-rate";

const express = require("express");
const router = express.Router();

router.get("/sources", withAuth, limitRate({ count: 3, period: 10000 }), function(req, res) {
  const sources = new Sources();

  sources.getAll().then(sources => {
    const success = Array.isArray(sources);
    return res.send({ success, results: sources });
  });
});

export default router;
