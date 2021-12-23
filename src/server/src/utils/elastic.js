import config from "config";

import { Client } from "@elastic/elasticsearch";
import codesNaf from "@socialgouv/codes-naf";

const client = new Client({
  node: config.elastic.url,
  auth: {
    apiKey: config.elastic.apiKey,
  },
});

const filtersFieldMap = {
  etats: "etatAdministratifEtablissement",
  activites: "domaineActivite",
  codesCommunes: "codeCommuneEtablissement",
  departements: "departementEtablissement",
  codesPostaux: "codesPostalEtablissement",
  tranchesEffectifs: "trancheEffectifsEtablissement",
};

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
                    {
                      multi_match: {
                        query,
                        type: "phrase",
                        fields: [
                          "raisonSociale",
                          "denominationUsuelleUniteLegale",
                          "enseigneEtablissement"
                        ],
                      }
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
        should: [
          { rank_feature: { boost: 5, field: "trancheEffectifsUniteLegaleRank" } },
          { rank_feature: { boost: 5, field: "etablissementsUniteLegale" } },
          { match: { etablissementSiege: { boost: 10, query: "true" } } },
          { match: { etatAdministratifEtablissement: { boost: 10, query: "A" } } },
          { match: { caractereEmployeurEtablissement: "O" } },
        ],
      },
    },
  };
};

const formatElasticResult = (hit) => {
  const result = hit?._source;

  result.libelleActivitePrincipale = getCodeNafLibelle(
    result.codeActivitePrincipale
  );

  result.score = hit?._score;

  return result;
};

export const getElasticQueryParams = (req) => {
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

export const requestElastic = async (params, { from, size }) => {
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