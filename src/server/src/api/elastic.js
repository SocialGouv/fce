import withAuth from "../middlewares/auth";
import codesNaf from "@socialgouv/codes-naf";
import config from "config";

import { Client } from "@elastic/elasticsearch";
import xlsx from "xlsx";

const client = new Client({
  node: config.elastic.url,
  auth: {
    apiKey: config.elastic.apiKey,
  },
});

const express = require("express");
const router = express.Router();

const getCodeNafLibelle = (code) =>
  codesNafLabelIndex.get(
    code
      .replace(/[A-z]+$/, "")
      .padEnd(5, "0")
      .slice(0, 5)
  );

const codesNafLabelIndex = codesNaf.reduce(
  (map, { id, label }) => map.set(id, label),
  new Map()
);

const formatElasticResult = (hit) => {
  const result = hit?._source;

  result.libelleActivitePrincipale = getCodeNafLibelle(
    result.codeActivitePrincipale
  );

  return result;
};

const rank_feature = { boost: 10, field: "trancheEffectifsUniteLegaleRank" };

const filtersFieldMap = {
  etats: "etatAdministratifEtablissement",
  activites: "domaineActivite",
  codesCommunes: "codeCommuneEtablissement",
  departements: "departementEtablissement",
  codesPostaux: "codesPostalEtablissement",
  tranchesEffectifs: "trancheEffectifsEtablissement",
};

const makeQuery = ({ query, siege, ...filters }) => {
  const siretOrSirenQuery = query.replace(/\s/g, "");

  return {
    ...(query ? { min_score: 20 } : {}),
    query: {
      bool: {
        filter: [
          ...(siege !== ""
            ? [
                {
                  term: { etablissementSiege: siege === "true" },
                },
              ]
            : []),
        ],
        must: [
          ...Object.keys(filtersFieldMap).flatMap((key) =>
            filters[key]?.length > 0
              ? [
                  {
                    terms: { [filtersFieldMap[key]]: filters[key] },
                  },
                ]
              : []
          ),
          ...(query
            ? [
                {
                  bool: {
                    should: [
                      { fuzzy: { naming: { boost: 0.6, value: query } } },
                      { match: { naming: query } },
                      {
                        match: {
                          denominationUniteLegale: { query, boost: 5 },
                        },
                      },
                      {
                        match: {
                          denominationUsuelleUniteLegale: { query, boost: 7 },
                        },
                      },
                      {
                        match: {
                          nomUniteLegale: { query, boost: 7 },
                        },
                      },
                      {
                        match: {
                          enseigneEtablissement: { query, boost: 10 },
                        },
                      },
                      ...(siretOrSirenQuery
                        ? [
                            {
                              term: {
                                siret: {
                                  value: query.replace(/\s/g, ""),
                                  boost: 100,
                                },
                              },
                            },
                            {
                              term: {
                                siren: {
                                  value: query.replace(/\s/g, ""),
                                  boost: 100,
                                },
                              },
                            },
                          ]
                        : []),
                    ],
                  },
                },
              ]
            : []),
        ],
        should: [{ rank_feature }, { match: { etablissementSiege: "true" } }],
      },
    },
  };
};

const getElasticQueryParams = (req) => {
  const query = (req.query["q"] || "").trim();
  const activites = req.query["activites"] || [];
  const codesCommunes = req.query["codesCommunes"] || [];
  const codesPostaux = req.query["codesPostaux"] || [];
  const departements = req.query["departements"] || [];
  const tranchesEffectifs = req.query["tranchesEffectifs"] || [];
  const etats = req.query["etats"] || [];
  const siege = (req.query["siege"] || "").trim();

  return {
    query,
    siege,
    etats,
    activites,
    codesCommunes,
    departements,
    codesPostaux,
    tranchesEffectifs,
  };
};

const requestElastic = async (params, { from, size }) => {
  const body = makeQuery(params);

  const {
    body: {
      hits: { total, hits },
    },
  } = await client.search({
    index: config.elastic.index,
    body,
    from,
    size,
  });
  return {
    results: hits?.map(formatElasticResult),
    total,
  };
};

router.get("/elastic", withAuth, async (req, res) => {
  const params = getElasticQueryParams(req);

  const from = req.query["from"] || 0;
  const size = req.query["size"] || 10;

  try {
    const { results, total } = await requestElastic(params, { from, size });

    res.json({
      total,
      results,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

const fetchAllResults = async (params) => {
  let results, total;
  let resultsList = [];
  let from = 0;
  const size = 100;

  do {
    ({ results, total } = await requestElastic(params, { from, size }));

    resultsList = resultsList.concat(results);

    from += size;
  } while (from < total);

  return resultsList;
};

const xlsxConfig = config.xlsxExport;

const exportToXlsx = (data) => {
  const wb = { SheetNames: [], Sheets: {} };
  const ws = xlsx.utils.json_to_sheet(data);
  const wsName = "FceExport";
  xlsx.utils.book_append_sheet(wb, ws, wsName);

  const wbout = Buffer.from(
    xlsx.write(wb, { bookType: "xlsx", type: "buffer" })
  );

  return wbout;
};

router.get("/downloadXlsx", async (req, res) => {
  const params = getElasticQueryParams(req);

  try {
    const results = await fetchAllResults(params);

    const formattedResults = results.map(
      ({
        siret,
        etatAdministratifEtablissement,
        denominationUniteLegale,
        enseigneEtablissement,
        etablissementSiege,
        codePostalEtablissement,
        libelleCommuneEtablissement,
        trancheEffectifsEtablissement,
        codeActivitePrincipale,
        adresseEtablissement,
        complementAdresseEtablissement,
      }) => ({
        Siret: siret,
        Etat: xlsxConfig.establishmentState[etatAdministratifEtablissement],
        "Raison sociale": enseigneEtablissement || denominationUniteLegale,
        "Categorie établissement": etablissementSiege
          ? "Siège Social"
          : "Établissement",
        Adresse: adresseEtablissement,
        "Complément d'adresse": complementAdresseEtablissement,
        "Code postal": codePostalEtablissement,
        Ville: libelleCommuneEtablissement,
        "Dernier effectif DSN connu": trancheEffectifsEtablissement,
        Activité: `${codeActivitePrincipale} - ${getCodeNafLibelle(
          codeActivitePrincipale
        )}`,
      })
    );

    const outputBuffer = exportToXlsx(formattedResults);

    res.set({
      "Content-type": "application/octet-stream",
    });
    res.send(outputBuffer);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

export default router;
