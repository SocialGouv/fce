import Communes from "../models/Communes";
import Naf from "../models/Naf";
import Departements from "../models/Departements";
import withAuth from "../middlewares/auth";

const express = require("express");
const xlsx = require("xlsx");
const router = express.Router();
const config = require("config");

const AppSearchClient = require("@elastic/app-search-node");
/** Create App-search client */
const apiKey = config.elasticIndexer.appsearch_apiKey;
const baseUrlFn = () => config.elasticIndexer.appsearch_address;
const engineName = config.elasticIndexer.appsearch_engineName;
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);
/** End creating App-search client */

const frentreprise = require("frentreprise");

const logError = (data, err) => {
  console.error(err);
  data.error = true;
  try {
    this.data.message = err.toString();
  } catch (Exception) {}
};

router.get("/entity", withAuth, function(req, res) {
  const query = (req.query["q"] || "").trim();

  const data = {
    query: {
      format: "json",
      terms: {
        q: query
      },
      isSIRET: frentreprise.isSIRET(query),
      isSIREN: frentreprise.isSIREN(query)
    }
  };

  const freCall = frentreprise
    .getEntreprise(data.query.terms.q)
    .then(entreprise => {
      data.results = [entreprise.export()];
      data.pagination = {};
    }, logError.bind(this, data));

  freCall.then(() => {
    data.size = (data.results && data.results.length) || 0;
    sendResult(data, res);
  });
});

router.get("/search", withAuth, function(req, res) {
  const query = (req.query["q"] || "").trim();
  const format = req.params["format"] || "json";
  const page = format === "xlsx" ? null : +req.query["page"] || 1;

  const data = {
    query: {
      format,
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

  const freCall = frentreprise.search(data.query.terms, page).then(results => {
    data.results = results.items.map(ent => ent.export());
    data.pagination = results.pagination;
  }, logError.bind(this, data));

  freCall.then(() => {
    data.size = (data.results && data.results.length) || 0;
    sendResult(data, res);
  });
});

router.post("/downloadCsv", withAuth, function(req, res) {
  console.log("TEST BODY =>", req.body);

  const payload = req.body.payload;

  if (payload && payload.searchTerm && payload.totalItems) {
    const searchTerm = payload.searchTerm;
    const totalItems = payload.totalItems;

    client
      .search(engineName, searchTerm, { page: { size: totalItems } })
      .then(response => {
        const data = response.results;

        const wb = { SheetNames: [], Sheets: {} };
        let dataJson = Object.values(data).map(tmpData => {
          const cleanTmpData = [];

          delete tmpData._meta;

          Object.entries(tmpData).forEach(([key, value]) => {
            cleanTmpData[key] = value.raw;
          });

          return cleanTmpData;
        });

        const ws = xlsx.utils.json_to_sheet(dataJson);
        const wsName = "FceExport";
        xlsx.utils.book_append_sheet(wb, ws, wsName);

        const wbout = Buffer.from(
          xlsx.write(wb, { bookType: "xlsx", type: "buffer" })
        );

        res.set({
          "Content-type": "application/octet-stream"
        });

        res.send(wbout);
      })
      .catch(error => {
        console.log(error);
        res.send({
          code: 500,
          message: error
        });
      });
  } else {
    res.send({
      code: 500,
      error: "Un export ne peux pas être effectué sur une recherche vide"
    });
  }
});

const sendResult = (data, response) => {
  response.send(data);
};

router.get("/communes", withAuth, function(req, res) {
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

router.get("/naf", withAuth, function(req, res) {
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

router.get("/departements", withAuth, function(req, res) {
  const query = (req.query["q"] || "").trim();

  const departements = new Departements();

  departements.search(query).then(departements => {
    const success = Array.isArray(departements);
    return res.send({ success, results: departements });
  });
});

module.exports = router;
