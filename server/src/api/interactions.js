const express = require("express");
const router = express.Router();
const InteractionModel = require("../models/InteractionModel");

router.get("/:siret", function(req, res) {
  let responseData = {};

  const logError = err => {
    console.error(err);
    responseData.error = true;
    try {
      responseData.message = err.toString();
      return responseData;
    } catch (Exception) {}
  };

  const siret = req.params.siret;
  if (!siret || siret.length === 0) {
    logError("Siret is not defined.");
    res.status(400);
    res.send(responseData);
  }

  return InteractionModel.findBySIRET(siret)
    .then(results => {
      responseData.results = results;
      responseData.success = true;
    }, logError)
    .then(() => {
      res.send(responseData);
    });
});

module.exports = router;
