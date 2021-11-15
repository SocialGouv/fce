import withAuth from "../middlewares/auth";
import NotFoundException from "../Exceptions/NotFoundException";
// eslint-disable-next-line node/no-missing-import
import config from "config";

import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: config.elastic.url,
  auth: {
    apiKey: config.elastic.apiKey
  }
});

const express = require("express");
const router = express.Router();

const makeFilter = (field, type = "term") =>
  (value) => (
    value
      ? [{
        [value.match(/^".+"$/) ? "term" : type]: {
          [field]: value.replace(/^"(.+)"$/, "$1")
        }
      }]
      : []
  );

const namingFilter = makeFilter("naming", "fuzzy");
const etatFilter = makeFilter("etatAdministratifEtablissement", "term");

const activiteFilter = makeFilter("activitePrincipaleUniteLegale", "prefix");
const communeFilter = makeFilter("libelleCommuneEtablissement", "match");
const codePostalFilter = makeFilter("codePostalEtablissement", "prefix");

const makeFilters = ({ etat }) => etat
  ? { filter: etatFilter(etat) }
  : {};

const makeMatches = ({ query, activite, commune, codePostal }) =>
  query || activite || commune || codePostal
    ? [{
      bool: {
        must: [
          ...namingFilter(query),
          ...activiteFilter(activite),
          ...communeFilter(commune),
          ...codePostalFilter(codePostal)
        ],
      }
    }]
    : [];

const makeBody = ({ filters, matches }) => ({
  query: {
    bool: {
      ...makeFilters(filters),
      must: makeMatches(matches)
    }
  }
});

router.get("/elastic", async (req, res) => {
  const query = (req.query["q"] || "").trim();
  const activite = (req.query["activite"] || "").trim();
  const commune = (req.query["commune"] || "").trim();
  const codePostal = (req.query["code_postal"] || "").trim();

  const etat = (req.query["etat"] || "").trim();

  const body = makeBody({
    matches: { query, activite, commune, codePostal },
    filters: { etat }
  });

  try {
    const { body: { hits: { total, hits } } } = await client.search({
      index: "recherche-entreprises",
      body
    });

    if (hits?.length < 1) {
      return res.status(404).json({
        error: "Pas de résultat"
      });
    }

    const results = hits?.map((hit) => hit?._source);

    res.json({
      total,
      results
    });
  } catch (e) {
    res.status(500).json(e)
  }
});

export default router;
