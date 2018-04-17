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
      format: req.params["format"] || "json",
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
      format: req.params["format"] || "json",
      params: {
        code_activite,
        libelle_commune,
        code_postal,
        code_departement
      }
    }
  };

  frentreprise.search(data.query.params).then(results => {
    data.results = results.map(ent => ent.export());
    data.size = data.results.length;
    sendResult(data, res);
  }, logError.bind(this, data));
});

const sendResult = (data, response) => {
  if (data.query.format === "xlsx") {
    let flattenResults = [];

    data.results.forEach(enterprise => {
      if (Array.isArray(enterprise.etablissements)) {
        enterprise.etablissements.forEach(establishment => {
          flattenResults.push({ ...enterprise, etablissement: establishment });
        });
      }
    });

    const fields = [];
    let filename = "export";

    if (data.query.isSIREN || data.query.isSIRET) {
      // Common etablissement and entreprise fields

      if (data.query.isSIREN) {
        // Entreprise fields
      } else if (data.query.isSIRET) {
        // Etablissement fields
      }
    } else {
      // Search
      filename = "recherche";
      if (data.query.search === "advanced") {
        filename += "_avancee";
      }

      fields.push(
        {
          label: "SIRET",
          value: "etablissement.siret",
          default: "NULL"
        },
        {
          label: "SIREN",
          value: "siren",
          default: "NULL"
        },
        {
          label: "Raison Sociale",
          value: "raison_sociale",
          default: "NULL"
        },
        {
          label: "Commune",
          value: "etablissement.adresse_components.localite",
          default: "NULL"
        },
        {
          label: "Code Postal",
          value: "etablissement.adresse_components.code_postal",
          default: "NULL"
        },
        {
          label: "Département",
          value: row => {
            return (
              row.etablissement &&
              row.etablissement.adresse_components &&
              row.etablissement.adresse_components.code_postal &&
              row.etablissement.adresse_components.code_postal.substr(0, 2)
            );
          },
          default: "NULL"
        },
        {
          label: "Activité",
          value: "etablissement.activite",
          default: "NULL"
        }
      );
    }

    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(
      flattenResults.length ? flattenResults : {}
    );

    const date = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/\..+/, "")
      .replace(/:/g, "-");

    response.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}_${date}.xlsx`
    );
    response.setHeader("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    response.send(csv);
  } else {
    response.send(data);
  }
};

module.exports = router;
