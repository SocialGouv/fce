import Communes from "../models/Communes";
import Naf from "../models/Naf";
import Departements from "../models/Departements";
import withAuth from "../middlewares/auth";
import NotFoundException from "../Exceptions/NotFoundException";
// eslint-disable-next-line node/no-missing-import
import frentreprise, { isSIRET, isSIREN } from "frentreprise";
import Establishment from "../models/Establishment";
import { limitRate } from "../middlewares/limit-rate";

const express = require("express");
const xlsx = require("xlsx");
const router = express.Router();
const config = require("config");
const AppSearchClient = require("@elastic/app-search-node");

const logError = (data, err) => {
  console.error({ logError: err });
  data.error = true;
  try {
    data.message = err.toString();
  } catch (Exception) {
    console.error({ logErrorCatch: Exception });
    data.message = "Unknown";
  }
};

const getAppSearchClient = () => {
  const apiKey = config.elasticIndexer.appsearch_apiKey;
  const baseUrlFn = () => config.elasticIndexer.appsearch_address;
  return new AppSearchClient(undefined, apiKey, baseUrlFn);
};

const isSuccessEnterprise = (data) => {
  return !!data.results?.[0]._success;
};

const isSuccessEstablishment = (data, siret) => {
  const establishments = data?.results?.[0]?.etablissements;
  if (!Array.isArray(establishments)) {
    return false;
  }

  const establishment = establishments.find(
    (establishment) => establishment?.siret === siret
  );

  return !!establishment?._success;
};

router.get("/entity", withAuth, limitRate({
  count: 2 * config.get("api.requestsPer10Seconds"),
  period: 10000
}), function (req, res) {
  const query = (req.query["q"] || "").trim();
  const dataSource = (req.query["dataSource"] || "").trim();

  const data = {
    query: {
      format: "json",
      terms: {
        q: query,
      },
      isSIRET: isSIRET(query),
      isSIREN: isSIREN(query),
      dataSource,
    },
  };

  const freCall = frentreprise
    .getEntreprise(query, dataSource)
    .then((entreprise) => {
      data.results = [entreprise.export()];
      const success = isSIREN(query)
        ? isSuccessEnterprise(data)
        : isSuccessEstablishment(data, query);

      if (!success) {
        data.code = 404;
        throw new NotFoundException(`${query} in ${dataSource}`);
      }
    }, logError.bind(this, data));

  freCall
    .then(() => {
      data.size = (data.results && data.results.length) || 0;
      sendResult(data, res);
    })
    .catch((e) => {
      logError(data, e);
      sendResult(data, res);
    });
});

const sendResult = (data, response) => {
  if (data?.error) {
    return response.status(data.code || 400).send(data);
  }

  return response.send(data);
};

router.get("/communes", withAuth, function (req, res) {
  const query = (req.query["q"] || "").trim();

  if (query.length < 2) {
    return res.send({ success: false, message: "query too short" });
  }

  const communes = new Communes();

  communes.search(query).then((communes) => {
    const success = Array.isArray(communes);
    return res.send({ success, results: communes });
  });
});

router.get("/naf", withAuth, function (req, res) {
  const naf = new Naf();

  naf.findAll().then((nafs) => {
    const success = Array.isArray(nafs);
    if (success) {
      return res.send({ success, results: nafs });
    }
    return res.send({
      success,
      results: [],
      message: "Une erreur est survenue lors de la recherche d'un code NAF",
    });
  });
});

router.get("/departements", withAuth, function (req, res) {
  const query = (req.query["q"] || "").trim();

  const departements = new Departements();

  departements.search(query).then((departements) => {
    const success = Array.isArray(departements);
    return res.send({ success, results: departements });
  });
});

export default router;
