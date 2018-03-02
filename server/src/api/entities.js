const express = require("express");
const router = express.Router();
const CommuneModel = require("../models/CommuneModel");
const DepartementModel = require("../models/DepartementModel");
const CodePostalModel = require("../models/CodePostalModel");

const getAllEntities = model => {
  let responseData = {};
  const logError = err => {
    console.error(err);
    responseData.error = true;
    try {
      responseData.message = err.toString();
      return responseData;
    } catch (Exception) {}
  };

  return model
    .find()
    .then(results => {
      responseData.results = results;
    }, logError)
    .then(() => {
      return responseData;
    });
};

router.get("/communes", function(req, res) {
  return getAllEntities(CommuneModel).then(data => {
    res.send(data);
  });
});

router.get("/departements", function(req, res) {
  return getAllEntities(DepartementModel).then(data => {
    res.send(data);
  });
});

router.get("/postalCodes", function(req, res) {
  return getAllEntities(CodePostalModel).then(data => {
    res.send(data);
  });
});

module.exports = router;
