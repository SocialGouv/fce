import withAuth from "../middlewares/auth";
import { getElasticQueryParams, requestElastic } from "../utils/elastic";

const express = require("express");
const router = express.Router();

router.get("/elastic", withAuth, async (req, res) => {
  const params = getElasticQueryParams(req);

  const from = req.query["from"] || 0;
  const size = req.query["size"] || 10;

  try {
    const { results, total } = await requestElastic(params, { from, size });

    res.json({
      total,
      results,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

export default router;
