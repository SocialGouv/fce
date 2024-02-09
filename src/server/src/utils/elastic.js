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
  departement: "departement",
  codesPostaux: "codesPostalEtablissement",
  tranchesEffectifs: "trancheEffectifsEtablissement",
  naf:"codeActivitePrincipale"
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

const makeQuery = ({ query, siege, dirigeant, ...filters }) => {
  const siretOrSirenQuery = query.replace(/\s/g, "");
  const dirigeantConditions = [];

  if (dirigeant) {
    if (dirigeant.nom && dirigeant.prenom) {
      dirigeantConditions.push({
        nested: {
          path: "dirigeants",
          query: {
            bool: {
              must: [
                {
                  match: {
                    "dirigeants.nom": {
                      query: dirigeant.nom,
                    },
                  },
                },
                {
                  match: {
                    "dirigeants.prenom": {
                      query: dirigeant.prenom,
                    },
                  },
                },
              ],
            },
          },
        },
      });
    }
    if (dirigeant.nom && !dirigeant.prenom) {
      dirigeantConditions.push({
        nested: {
          path: "dirigeants",
          query: {
            match: { "dirigeants.nom": dirigeant.nom },
          },
        },
      });
    }
    if (dirigeant.prenom && !dirigeant.nom) {
      dirigeantConditions.push({
        nested: {
          path: "dirigeants",
          query: {
            match: { "dirigeants.prenom": dirigeant.prenom },
          },
        },
      });
    }
  }
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
          ...dirigeantConditions,
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
                            "naming",
                            "denominationUsuelleUniteLegale",
                            "raisonSociale",
                          ],
                          minimum_should_match: "100%",
                          boost: 100,
                        },
                      },

                      {
                        multi_match: {
                          query,
                          fields: [
                            "denominationUsuelleUniteLegale",
                            "raisonSociale",
                          ],
                          fuzziness: "AUTO",
                          minimum_should_match: "100%",
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
        should: [
          {
            rank_feature: {
              boost: 5,
              field: "trancheEffectifsUniteLegaleRank",
            },
          },
          {
            rank_feature: { boost: 5, field: "etablissementsUniteLegaleRank" },
          },
          {
            rank_feature: {
              boost: 5,
              field: "caractereEmployeurEtablissementRank",
            },
          },
          { match: { etablissementSiege: { boost: 10, query: "true" } } },
          {
            match: {
              etatAdministratifEtablissement: { boost: 101, query: "A" },
            },
          },
        ],
      },
    },
  };
};

const formatElasticResult = (hit) => {
  const result = hit?._source;

  if (result.codeActivitePrincipale) {
    result.libelleActivitePrincipale = getCodeNafLibelle(
      result.codeActivitePrincipale
    );
  }

  result.score = hit?._score;

  return result;
};

export const getElasticQueryParams = (req) => {
  const query = (req.query["q"] || "").trim();
  const activites = req.query["activites"] || [];
  const naf=req.query["naf"] || [];
  const codesCommunes = req.query["codesCommunes"] || [];
  const codesPostaux = req.query["codesPostaux"] || [];
  const departement = req.query["departements"] || [];
  const tranchesEffectifs = req.query["tranchesEffectifs"] || [];
  const dirigeant = req.query["dirigeant"]
    ? JSON.parse(req.query["dirigeant"])
    : null;

  let etats = req.query["etats"] || [];
  const siege = (req.query["siege"] || "").trim();

  if (etats.includes("A") && etats.includes("F")) {
    etats = null;
  }

  return {
    query,
    siege,
    etats,
    activites,
    codesCommunes,
    departement,
    codesPostaux,
    tranchesEffectifs,
    dirigeant,
    naf
  };
};

export const requestElastic = async (params, { from, size }) => {
  console.log(params);
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
