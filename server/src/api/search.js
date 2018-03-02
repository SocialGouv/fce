var express = require("express");
var router = express.Router();
var frentreprise = require("frentreprise");
var Etablissement = require("../models/Etablissement");

router.get("/search", function(req, res) {
  const query = (req.query["q"] || "").trim();
  const data = {
    query: {
      q: query,
      isSIRET: frentreprise.isSIRET(query),
      isSIREN: frentreprise.isSIREN(query)
    }
  };

  const logError = err => {
    console.error(err);
    data.error = true;
    try {
      data.message = err.toString();
    } catch (Exception) {}
  };

  let freCall;

  if (data.query.isSIREN || data.query.isSIRET) {
    freCall = frentreprise.getEntreprise(data.query.q).then(entreprise => {
      data.results = [entreprise.export()];
    }, logError);
  } else {
    const raisonSociale = data.query.q;
    freCall = Etablissement.findByRaisonSociale(raisonSociale).then(results => {
      data.results = results;
    }, logError);
  }

  freCall.then(() => {
    res.send(data);
  });
});

router.get("/advancedSearch", function(req, res) {
  const code_activite = (req.query["naf"] || "").trim();
  const libelle_commune = (req.query["commune"] || "").trim();
  const code_postal = (req.query["codePostal"] || "").trim();
  const code_departement = (req.query["departement"] || "").trim();

  const data = {
    query: {
      code_activite,
      libelle_commune,
      code_postal,
      code_departement
    }
  };

  const logError = err => {
    console.error(err);
    data.error = true;
    try {
      data.message = err.toString();
    } catch (Exception) {}
  };

  Etablissement.findByRaisonSociale(data.query)
    .then(results => {
      data.results = results;
    }, logError)
    .then(() => {
      res.send(data);
    });
});

module.exports = router;
