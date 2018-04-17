const express = require("express");
const router = express.Router();
const CommuneModel = require("../models/CommuneModel");
const DepartementModel = require("../models/DepartementModel");
const CodePostalModel = require("../models/CodePostalModel");
const NomenclatureModel = require("../models/NomenclatureModel");

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
      const cleanData = data.filter(commune => {
        return commune.libelle_commune.match(/^[a-zA-Z]/g);
      });
      responseData.results.communes = cleanData;
      return DepartementModel.find();
    })
    .then(data => {
      const cleanData = data.filter(departement => {
        return departement.code_departement.match(/[0-9]{2}/g);
      });
      responseData.results.departements = cleanData;
      return CodePostalModel.find();
    })
    .then(data => {
      const cleanData = data.filter(postalCode => {
        if(postalCode.code_postal === "00000"){
          return false;
        }
        return postalCode.code_postal.match(/[0-9]{5}/g);
      });
      responseData.results.postalCodes = cleanData;
      return NomenclatureModel.findByCategory("code_activite_naf");
    })
    .then(data => {
      responseData.results.nafCodes = data;
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

router.get("/nafCodes", function(req, res) {
  let responseData = { results: {} };

  return NomenclatureModel.findByCategory("code_activite_naf").then(data => {
    responseData.results = data;
    responseData.success = true;
    res.send(responseData);
  });
});

module.exports = router;
