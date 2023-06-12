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
const generateWordCombos = (phrase) => {
  // Sépare la phrase en mots individuels
  const mots = phrase.split(" ");

  // Fonction récursive pour générer les combos
  function generateCombos(index, comboCourant) {
    // Cas de base : tous les mots ont été utilisés
    if (index === mots.length) {
      return [comboCourant.trim()];
    }

    // Génère tous les combos en incluant ou excluant le mot actuel
    const combosInclus = generateCombos(
      index + 1,
      comboCourant + " " + mots[index]
    );
    const combosExclus = generateCombos(index + 1, comboCourant);

    return [...combosInclus, ...combosExclus];
  }

  // Appelle la fonction récursive avec l'index initial à 0 et une chaîne vide comme combo initial
  const combos = generateCombos(0, "");

  // Ajoute des combos avec les mots dans un autre ordre
  const reverseCombos = combos.map((combo) =>
    combo.split(" ").reverse().join(" ")
  );
  combos.push(...reverseCombos);

  // Élimine les doublons et la chaîne vide
  const uniqueCombos = [...new Set(combos)].filter((combo) => combo !== "");

  return uniqueCombos;
};

const makeQuery = ({ query, siege, ...filters }) => {
  const siretOrSirenQuery = query.replace(/\s/g, "");
  const mots = generateWordCombos(query);
  console.log(mots);
  console.log(
    mots.map((mot) => {
      return {
        multi_match: {
          query: mot,
          type: "phrase",
          fields: [
            "raisonSociale",
            "denominationUsuelleUniteLegale",
            "enseigneEtablissement",
          ],
        },
      };
    })
  );
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
                      ...mots.map((mot) => {
                        return {
                          multi_match: {
                            query: mot,
                            type: "phrase",
                            fields: [
                              "raisonSociale",
                              "denominationUsuelleUniteLegale",
                              "enseigneEtablissement",
                            ],
                          },
                        };
                      }),
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
              etatAdministratifEtablissement: { boost: 10, query: "A" },
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
  const codesCommunes = req.query["codesCommunes"] || [];
  const codesPostaux = req.query["codesPostaux"] || [];
  const departements = req.query["departements"] || [];
  const tranchesEffectifs = req.query["tranchesEffectifs"] || [];
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
