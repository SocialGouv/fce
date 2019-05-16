import Communes from "../models/Communes";
import Naf from "../models/Naf";
import Departements from "../models/Departements";

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
      format: req.params["format"] || "json",
      terms: {
        q: query,
        commune: (req.query["commune"] || "").trim(),
        codePostal: (req.query["codePostal"] || "").trim(),
        departement: (req.query["departement"] || "").trim(),
        naf: Array.isArray(req.query["naf"]) ? req.query["naf"] : [],
        siegeSocial:
          req.query["siegeSocial"] === "1" ||
          req.query["siegeSocial"] === "true" ||
          req.query["siegeSocial"] === true
      },
      isSIRET: frentreprise.isSIRET(query),
      isSIREN: frentreprise.isSIREN(query)
    }
  };

  let freCall;

  if (data.query.isSIRET) {
    freCall = frentreprise
      .getEntreprise(data.query.terms.q)
      .then(entreprise => {
        data.results = [entreprise.export()];
        data.pagination = {};
      }, logError.bind(this, data));
  } else {
    freCall = frentreprise.search(data.query.terms, page).then(results => {
      data.results = results.items.map(ent => ent.export());
      data.pagination = results.pagination;
    }, logError.bind(this, data));
  }

  freCall.then(() => {
    data.size = (data.results && data.results.length) || 0;
    sendResult(data, res);
  });
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

router.get("/communes", function(req, res) {
  const query = (req.query["q"] || "").trim();

  if (query.length < 2) {
    return res.send({ success: false, message: "query too short" });
  }

  const communes = new Communes();

  communes.search(query).then(communes => {
    const success = Array.isArray(communes);
    return res.send({ success, results: communes });
  });
});

router.get("/naf", function(req, res) {
  const naf = new Naf();

  naf.findAll().then(nafs => {
    const success = Array.isArray(nafs);
    if (success) {
      return res.send({ success, results: nafs });
    }
    return res.send({
      success,
      results: [],
      message: "Une erreur est survenue lors de la recherche d'un code NAF"
    });
  });
});

router.get("/departements", function(req, res) {
  const query = (req.query["q"] || "").trim();

  const departements = new Departements();

  departements.search(query).then(departements => {
    const success = Array.isArray(departements);
    return res.send({ success, results: departements });
  });
});

module.exports = router;
