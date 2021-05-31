const parse = require("csv-parse");
const fs = require("fs");
const config = require("config");
const { Transform, Writable } = require("stream");
const AppSearchClient = require("@elastic/app-search-node");
const { compose, mapKeys, pick, toLower, mapValues, reverse, chunk, map, split, join } = require("lodash/fp");
const pLimit = require("p-limit");

const CONCURRENCY = 10;

const limiter = pLimit(CONCURRENCY);

const apiKey = config.elasticIndexer.appsearch_apiKey;
const baseUrlFn = () => config.elasticIndexer.appsearch_address;
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);
const engineName = config.elasticIndexer.appsearch_engineName;

const BULK_SIZE = 100;

const effectifBetween = (min, max) => ({ lastdsneffectif }) => +lastdsneffectif >= min && lastdsneffectif <= max;

const tranchesEffectif = [
  {
    condition: ({ lastdsneffectif }) => +lastdsneffectif === 0,
    value: "0"
  },
  {
    condition: effectifBetween(1, 2),
    value: "01"
  },
  {
    condition: effectifBetween(3, 5),
    value: "02"
  },
  {
    condition: effectifBetween(6, 9),
    value: "03"
  },
  {
    condition: effectifBetween(10, 19),
    value: "11"
  },
  {
    condition: effectifBetween(20, 49),
    value: "12"
  },
  {
    condition: effectifBetween(50, 99),
    value: "21"
  },
  {
    condition: effectifBetween(100, 249),
    value: "22"
  },
  {
    condition: effectifBetween(250, 499),
    value: "31"
  },
  {
    condition: effectifBetween(500, 999),
    value: "32"
  },
  {
    condition: effectifBetween(1000, 1999),
    value: "41"
  },
  {
    condition: effectifBetween(2000, 4999),
    value: "42"
  },
  {
    condition: ({ lastdsneffectif }) => +lastdsneffectif >= 5000,
    value: "51"
  }
];

const keysMaps = {
  longdescription: "activiteprincipaleetablissement_libelle",
  categoriejuridiqueunitelegale: "entreprise_categoriejuridiqueunitelegale",
  nomunitelegale: "entreprise_nomunitelegale",
  prenomusuelunitelegale: "entreprise_prenomusuelunitelegale",
  denominationunitelegale: "entreprise_denominationunitelegale",
  denominationusuelle1unitelegale: "entreprise_denominationusuelle1unitelegale",
  denominationusuelle2unitelegale: "entreprise_denominationusuelle2unitelegale",
  denominationusuelle3unitelegale: "entreprise_denominationusuelle3unitelegale",
  prenom1unitelegale: "entreprise_prenom1unitelegale",
  nomusageunitelegale: "entreprise_nomusageunitelegale",
  effectif: "lastdsneffectif"
}

const indexedKeys = [
  "id",
  "siren",
  "siret",
  "enterprise_name",
  "entreprise_denominationunitelegale",
  "establishment_name",
  "trancheeffectifsetablissement",
  "etablissementsiege",
  "etatadministratifetablissement",
  "codepostaletablissement",
  "departement",
  "libellecommuneetablissement",
  "naf_division",
  "codecommuneetablissement",
  "activiteprincipaleetablissement",
  "activiteprincipaleetablissement_libelle",
  "denominationusuelleetablissement",
  "enseigne1etablissement",
  "enseigne2etablissement",
  "enseigne3etablissement",
  "entreprise_denominationusuelle1unitelegale",
  "entreprise_denominationusuelle2unitelegale",
  "entreprise_denominationusuelle3unitelegale",
  "entreprise_prenomusuelunitelegale",
  "entreprise_nomunitelegale",
  "entreprise_prenom1unitelegale",
  "entreprise_nomusageunitelegale",
  "entreprise_categoriejuridiqueunitelegale",
  "lastdsneffectif",
  "lastdsntrancheeffectifsetablissement"
];

const isIndividualEnterprise =
    entreprise_categoriejuridiqueunitelegale =>
      entreprise_categoriejuridiqueunitelegale === config.elasticIndexer.appSearchConst.physicPersonJuridicCode

const computedKeys = {
  id: ({ siret }) => siret,
  departement: ({ codepostaletablissement }) => codepostaletablissement.slice(0, 2),
  enterprise_name: ({
      denominationunitelegale,
      entreprise_categoriejuridiqueunitelegale,
      entreprise_prenomusuelunitelegale,
      entreprise_nomunitelegale
  }) =>
    isIndividualEnterprise(entreprise_categoriejuridiqueunitelegale) ?
      `${entreprise_prenomusuelunitelegale} ${entreprise_nomunitelegale}`:
      denominationunitelegale,
  establishment_name: ({
     denominationusuelleetablissement,
     enseigne1etablissement,
     enseigne2etablissement,
     enseigne3etablissement
  }) => denominationusuelleetablissement ||
    enseigne1etablissement ||
    enseigne2etablissement ||
    enseigne3etablissement,
  naf_division: ({ activiteprincipaleetablissement }) =>
    activiteprincipaleetablissement && activiteprincipaleetablissement.slice(0, 2) || null,
  lastdsntrancheeffectifsetablissement: (data) => tranchesEffectif.find(({ condition }) => condition(data)).value
}

const computeKeys = (config) => (obj) => ({
  ...obj,
  ...mapValues(computer => computer(obj))(config)
});

const prepareData = compose(
  pick(indexedKeys),
  computeKeys(computedKeys),
  mapKeys((key) => keysMaps[key] || key),
  mapKeys(toLower),
)

console.log("indexer", config.get("elasticIndexer"));

const bufferStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    if (!this.chunks) {
      this.chunks = [];
    }
    this.chunks.push(chunk);

    if (this.chunks.length >= BULK_SIZE) {
      callback(null, this.chunks);
      this.chunks = [];
    } else {
     callback(null);
    }
  },
  flush(callback) {
    callback();
  }
});

let written = 0;

const splitDisplay = compose(
  join(" "),
  map(join("")),
  reverse,
  map(reverse),
  chunk(3),
  reverse,
  split(""),
);

const v = 1000000;

const writable = new Writable({
  objectMode: true,
  write(chunks, encoding, callback) {
    const data = chunks.map(prepareData);

    limiter(() => client.indexDocuments(engineName, data))
      .then((result) => {
        written += chunks.length;
        console.log(`Rows indexed : ${written}`);
        result.filter(({ errors }) => errors.length > 0)
          .map(({ errors }) => console.log(errors));
        callback(null);
      });

    if (limiter.activeCount < CONCURRENCY) {
      callback(null);
    }
  }
})

const mergeCsv = () => {
  console.time("Ingesting");
  const parser = parse({
    columns: true,
    delimiter: ";"
  });

  fs.createReadStream("/mnt/data/export/assembly.csv")
    .pipe(parser)
    .pipe(bufferStream)
    .pipe(writable)
    .on("end", () => {
      console.timeEnd("Ingested");
    });
}

mergeCsv();
