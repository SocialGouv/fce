import Communes from "../models/Communes";
import Naf from "../models/Naf";
import Departements from "../models/Departements";
import withAuth from "../middlewares/auth";

const express = require("express");
const xlsx = require("xlsx");
const router = express.Router();
const config = require("config");
const AppSearchClient = require("@elastic/app-search-node");

const frentreprise = require("frentreprise");

const logError = (data, err) => {
  console.error(err);
  data.error = true;
  try {
    this.data.message = err.toString();
  } catch (Exception) {}
};

const getAppSearchClient = () => {
  const apiKey = config.elasticIndexer.appsearch_apiKey;
  const baseUrlFn = () => config.elasticIndexer.appsearch_address;
  return new AppSearchClient(undefined, apiKey, baseUrlFn);
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

router.post("/getAppsearchWithFilters", withAuth, async function(req, res) {
  const payload = req.body.payload;

  if (!payload || !payload.searchTerm || !payload.totalItems) {
    return res.send({
      code: 500,
      error: "Un export ne peux pas être effectué sur une recherche vide"
    });
  }

  const searchTerm = payload.searchTerm;
  const totalItems = payload.totalItems;
  const filters = payload.filters;
  const client = getAppSearchClient();
  const engineName = config.get("elasticIndexer.appsearch_engineName");
  const pageLimit = config.get("elasticIndexer.appsearch_pageLimit");
  const pages = Math.ceil(totalItems / pageLimit);

  let postalCodesRaw = [];

  const resultFields = { codepostaletablissement: { raw: {} } };

  for (let page = 1; page <= pages; page++) {
    try {
      const response = await client.search(engineName, searchTerm, {
        page: { current: page, size: pageLimit, filters: filters },
        result_fields: resultFields
      });

      postalCodesRaw = [...postalCodesRaw, ...response.results];
    } catch (error) {
      console.error(error);
      res.send({
        code: 500,
        message: error.message
      });
    }
  }

  const postalCodes = [
    ...new Set(
      postalCodesRaw.map(
        ({ codepostaletablissement: { raw: codepostaletablissement } }) =>
          codepostaletablissement
      )
    )
  ].sort((a, b) => a - b);

  if (!postalCodes.length) {
    return res.send({
      code: 500,
      error: "Un export ne peux pas être effectué sur une recherche vide"
    });
  }

  res.set({
    "Content-Type": "application/json"
  });

  res.send({ results: postalCodes });
});

router.post("/downloadXlsx", withAuth, async function(req, res) {
  const payload = req.body.payload;

  if (!payload || !payload.searchTerm || !payload.totalItems) {
    return res.send({
      code: 500,
      error: "Un export ne peux pas être effectué sur une recherche vide"
    });
  }

  const searchTerm = payload.searchTerm;
  const totalItems = payload.totalItems;
  const client = getAppSearchClient();
  const engineName = config.get("elasticIndexer.appsearch_engineName");
  const pageLimit = config.get("elasticIndexer.appsearch_pageLimit");
  const pages = Math.ceil(totalItems / pageLimit);
  const xlsxConfig = config.xlsxExport;

  let establishments = [];

  for (let page = 1; page <= pages; page++) {
    try {
      const response = await client.search(engineName, `"${searchTerm}"`, {
        page: { current: page, size: pageLimit }
      });

      establishments = [...establishments, ...response.results];
    } catch (error) {
      console.error(error);
      res.send({
        code: 500,
        message: error.message
      });
    }
  }

  if (!establishments.length) {
    return res.send({
      code: 500,
      error: "Un export ne peux pas être effectué sur une recherche vide"
    });
  }

  const wb = { SheetNames: [], Sheets: {} };
  const dataJson = Object.values(establishments).map(tmpData => {
    const cleanTmpData = [];
    delete tmpData._meta;

    Object.entries(tmpData).forEach(([key, value]) => {
      cleanTmpData[key] = value.raw;
    });

    const formatedData = {
      siret: cleanTmpData.siret,
      etat:
        xlsxConfig.establishmentState[
          cleanTmpData.etatadministratifetablissement
        ],
      raison_sociale: cleanTmpData.establishment_name
        ? cleanTmpData.establishment_name
        : cleanTmpData.entreprise_denominationunitelegale,
      categorie_etablissement: cleanTmpData.etablissementsiege
        ? "Siège social"
        : "Établissement",
      code_postal: cleanTmpData.codepostaletablissement,
      effectif:
        xlsxConfig.inseeSizeRanges[cleanTmpData.trancheeffectifsetablissement],
      activite:
        cleanTmpData.activiteprincipaleetablissement +
        " - " +
        cleanTmpData.activiteprincipaleetablissement_libelle
    };

    return formatedData;
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
