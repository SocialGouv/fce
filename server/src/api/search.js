const express = require("express");
const router = express.Router();

const EtablissementModel = require("../models/EtablissementModel");
const deleteKeyIfNotDefinedOrEmpty = require("../utils/ObjectManipulations")
  .deleteKeyIfNotDefinedOrEmpty;

const frentreprise = __DIST
  ? require("frentreprise")
  : require("../../lib/frentreprise/src/frentreprise.js");

const logError = err => {
  console.error(err);
  data.error = true;
  try {
    data.message = err.toString();
  } catch (Exception) {}
};

router.get("/search", function(req, res) {
  const query = (req.query["q"] || "").trim();
  const data = {
    query: {
      q: query,
      isSIRET: frentreprise.isSIRET(query),
      isSIREN: frentreprise.isSIREN(query)
    }
  };

  let freCall;

  if (data.query.isSIREN || data.query.isSIRET) {
    freCall = frentreprise.getEntreprise(data.query.q).then(entreprise => {
      data.results = [entreprise.export()];
    }, logError);
  } else {
    freCall = frentreprise.search(data.query.q).then(results => {
      data.results = results.map(ent => ent.export());
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

  let freCall = frentreprise.search(data.query).then(results => {
    data.results = results.map(ent => ent.export());
  }, logError);

  freCall.then(() => {
    res.send(data);
  });
});

module.exports = router;
