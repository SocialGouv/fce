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

router.get("/entities", function(req, res) {
  let responseData = { results: {} };

  return CommuneModel.find()
    .then(data => {
      responseData.results.communes = data;
      return DepartementModel.find();
    })
    .then(data => {
      responseData.results.departements = data;
      return CodePostalModel.find();
    })
    .then(data => {
      responseData.results.postalCodes = data;
      responseData.success = true;

      res.send(responseData);
    });
});

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
