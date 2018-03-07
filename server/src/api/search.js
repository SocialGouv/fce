const express = require("express");
const Json2csvParser = require("json2csv").Parser;
const router = express.Router();

const EtablissementModel = require("../models/EtablissementModel");
const deleteKeyIfNotDefinedOrEmpty = require("../utils/ObjectManipulations")
  .deleteKeyIfNotDefinedOrEmpty;

const frentreprise = __DIST
  ? require("frentreprise")
  : require("../../lib/frentreprise/src/frentreprise.js");

const logError = (data, err) => {
  console.error(err);
  data.error = true;
  try {
    this.data.message = err.toString();
  } catch (Exception) {}
};

router.get("/search(.:format)?", function(req, res) {
  const query = (req.query["q"] || "").trim();
  const data = {
    query: {
      search: "simple",
      format: req.param("format", "json"),
      q: query,
      isSIRET: frentreprise.isSIRET(query),
      isSIREN: frentreprise.isSIREN(query)
    }
  };

  let freCall;

  if (data.query.isSIREN || data.query.isSIRET) {
    freCall = frentreprise.getEntreprise(data.query.q).then(entreprise => {
      data.results = [entreprise.export()];
    }, logError.bind(this, data));
  } else {
    freCall = frentreprise.search(data.query.q).then(results => {
      data.results = results.map(ent => ent.export());
    }, logError.bind(this, data));
  }

  freCall.then(() => {
    data.size = data.results.length;
    sendResult(data, res);
  });
});

router.get("/advancedSearch(.:format)?", function(req, res) {
  const code_activite = (req.query["naf"] || "").trim();
  const libelle_commune = (req.query["commune"] || "").trim();
  const code_postal = (req.query["codePostal"] || "").trim();
  const code_departement = (req.query["departement"] || "").trim();

  let data = {
    query: {
      search: "advanced",
      format: req.param("format", "json"),
      code_activite,
      libelle_commune,
      code_postal,
      code_departement
    }
  };

  frentreprise.search(data.query).then(results => {
    data.results = results.map(ent => ent.export());
    data.size = data.results.length;
    sendResult(data, res);
  }, logError.bind(this, data));
});

const sendResult = (data, response) => {
  if (data.query.format === "csv") {
    const json2csvParser = new Json2csvParser();

    const fields = [];

    if (data.query.isSIREN && data.query.isSIRET) {
      // Common etablissement and entreprise fields

      if (data.query.isSIREN) {
        // Entreprise fields
      } else if (data.query.isSIRET) {
        // Etablissement fields
      }
    } else {
      // Search results
      
    }

    const csv = json2csvParser.parse(data.results);

    response.send(csv);
  } else {
    response.send(data);
  }
};

module.exports = router;
