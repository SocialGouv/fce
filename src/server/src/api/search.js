const express = require("express");
const XLSX = require("xlsx");
const router = express.Router();

const frentreprise = require("frentreprise");

const logError = (data, err) => {
  console.error(err);
  data.error = true;
  try {
    this.data.message = err.toString();
  } catch (Exception) {}
};

router.get("/search(.:format)?", function(req, res) {
  const query = (req.query["q"] || "").trim();
  const page = +req.query["page"] || 1;

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
    freCall = frentreprise.search(data.query.q, page).then(results => {
      data.results = results.map(ent => ent.export());
    }, logError.bind(this, data));
  }

  freCall.then(() => {
    data.size = (data.results && data.results.length) || 0;
    sendResult(data, res);
  });
});

router.get("/advancedSearch(.:format)?", function(req, res) {
  const code_activite = (req.query["naf"] || "").trim();
  const libelle_commune = (req.query["commune"] || "").trim();
  const code_postal = (req.query["codePostal"] || "").trim();
  const code_departement = (req.query["departement"] || "").trim();
  const raison_sociale = (req.query["raisonSociale"] || "").trim();
  const siren = (req.query["siren"] || "").trim();
  const siege_social = (req.query["siegeSocial"] || "").trim();
  const interactions = (req.query["interactions"] || []).map(interaction => {
    try {
      return JSON.parse(interaction).value;
    } catch (e) {
      console.error(e);
    }
  });

  let data = {
    query: {
      search: "advanced",
      format: req.params["format"] || "json",
      params: {
        code_activite,
        libelle_commune,
        code_postal,
        code_departement,
        raison_sociale,
        siren,
        siege_social,
        interactions
      }
    }
  };

  frentreprise.search(data.query.params).then(results => {
    try {
      results = results.map(ent => ent.export());
    } catch (e) {
      results = false;
    }
    data.results = results;
    data.size = data.results && data.results.length;
    sendResult(data, res);
  }, logError.bind(this, data));
});

const sendResult = (data, response) => {
  if (data.query.format === "xlsx") {
    sendResultXlsx(data, response);
  } else {
    response.send(data);
  }
};

const sendResultXlsx = (data, response) => {
  let flattenResults = [];

  data.results.forEach(enterprise => {
    if (Array.isArray(enterprise.etablissements)) {
      enterprise.etablissements.forEach(establishment => {
        flattenResults.push({ ...enterprise, etablissement: establishment });
      });
    }
  });

  let dataToExport = [];
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

    dataToExport = flattenResults.map(entreprise => {
      const etablissement = entreprise.etablissement;

      return {
        SIRET: etablissement.siret,
        SIREN: entreprise.siren,
        "Raison Sociale": entreprise.raison_sociale,
        Etat:
          etablissement.etat_etablissement &&
          etablissement.etat_etablissement.label,
        Commune:
          etablissement.adresse_components &&
          etablissement.adresse_components.localite,
        "Code Postal":
          etablissement.adresse_components &&
          etablissement.adresse_components.code_postal,
        Département:
          etablissement.adresse_components &&
          etablissement.adresse_components.code_postal &&
          etablissement.adresse_components.code_postal.substr(0, 2),
        Activité: etablissement.activite,
        "Catégorie Etablissement": etablissement.categorie_etablissement,
        Intéractions: Array.isArray(etablissement.direccte)
          ? etablissement.direccte.length
          : ""
      };
    });
  }
  const wb = { SheetNames: [], Sheets: {} };
  wb.Props = {
    Title: filename,
    Author: "Direccte"
  };

  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wsName = "Export";
  XLSX.utils.book_append_sheet(wb, ws, wsName);

  const wbout = new Buffer(
    XLSX.write(wb, { bookType: "xlsx", type: "buffer" })
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
  response.type("application/octet-stream");
  response.send(wbout);
};

router.get("/test-postgres", function(request, response) {
  const db = require("../db/postgres");

  db.query("SELECT * FROM test")
    .then(res => {
      response.send({ success: true, pg: res.rows });
    })
    .catch(e => {
      response.send({ success: false });
    });
});

module.exports = router;
