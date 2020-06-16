require("dotenv").config();
const fs = require("fs");
const process = require("process");

const config = {
  client: {
    baseUrl: process.env.CLIENT_BASE_URL,
  },
  APIGouv: {
    token: process.env.API_GOUV_TOKEN,
  },
  SireneAPI: {
    enable: false,
    basicAuth: process.env.API_SIRENE_BASIC_AUTH,
    pagination: {
      itemsByPage: 15,
    },
  },
  db: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    /* ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync("/var/certs/root.crt").toString(),
      key: fs.readFileSync("/var/certs/postgresql.key").toString(),
      cert: fs.readFileSync("/var/certs/postgresql.crt").toString()
    } */
  },
  sentryUrlKey:
    "https://fecf5988311f413c9bba70e80454cc3a@sentry.fabrique.social.gouv.fr/35",
  mail: JSON.parse(process.env.MAIL),
  proxy: false,
  apiTimeout: 10000,
  authCode: {
    allowedEmails: JSON.parse(process.env.MAGIC_KEY_ALLOWED_EMAILS).map(
      (mask) => new RegExp(mask)
    ),
    codeLength: 5,
    maxFailures: 3,
    expire: process.env.MAGIC_KEY_EXPIRE,
    bcc: process.env.MAGIC_LINK_BCC,
  },
  userFeedback: {
    mailTo: process.env.MAIL_TO,
  },
  rupco: {
    pse: {
      procedureDurationLimit: 36, // months
    },
    lice: {
      types: {
        "LiceC -10": "Licenciement moins de 10 salariés (2 à 9 salariés)",
        "LiceC +10":
          "Licenciement plus de 10 salariés (entreprise de moins de 50 salariés)",
      },
    },
    historicDataDefaultState: "Non communiqué",
    historicDataStates: {
      cloture: "Clôturé",
      BilanTermine: "Bilan terminé",
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
  },
  elasticIndexer: {
    appsearch_address: process.env.JWT_APPSEARCH_ADDRRESS,
    appsearch_apiKey: process.env.JWT_APPSEARCH_API_KEY,
    appsearch_engineName: process.env.JWT_APPSEARCH_ENGINE_NAME,
    appsearch_concurencyLimit: 8,
    appsearch_pageLimit: 1000,
    client_address: process.env.JWT_ELASTIC_CLIENT_ADDRESS,
    cursor_size: 100,
    enterpriseFields: [
      "denominationunitelegale",
      "nomunitelegale",
      "nomusageunitelegale",
      "prenomusuelunitelegale",
      "prenom1unitelegale",
      "siren",
      "categoriejuridiqueunitelegale",
      "denominationusuelle1unitelegale",
      "denominationusuelle2unitelegale",
      "denominationusuelle3unitelegale",
    ],
    appSearchConst: {
      physicPersonJuridicCode: "1000",
    },
  },
  xlsxExport: {
    establishmentState: {
      A: "Actif",
      F: "Fermé",
    },
    inseeSizeRanges: {
      NN: "Unité non employeuse",
      "0 salarié": "0 salarié (pas d'effectif au 31/12 )",
      "01": "1 ou 2 salariés",
      "02": "3 à 5 salariés",
      "03": "6 à 9 salariés",
      "11": "10 à 19 salariés",
      "12": "20 à 49 salariés",
      "21": "50 à 99 salariés",
      "22": "100 à 199 salariés",
      "31": "200 à 249 salariés",
      "32": "250 à 499 salariés",
      "41": "500 à 999 salariés",
      "42": "1 000 à 1 999 salariés",
      "51": "2 000 à 4 999 salariés",
      "52": "5 000 à 9 999 salariés",
      "53": "10 000 salariés et plus",
    },
  },
  sanitizeTables: [
    {
      fields: ["siret", "numero_de_dossier"],
      table: "etablissements_pse",
      hasId: false,
    },
    {
      fields: ["code"],
      table: "departements",
      hasId: false,
    },
    {
      fields: ["nom", "code_postal"],
      table: "communes",
      hasId: false,
    },
    {
      fields: ["siret", "date_visite"],
      table: "interactions_pole_3e",
      hasId: true,
    },
  ],
};

if (process.env.HOST) {
  config.host = process.env.HOST;
}

if (process.env.PORT) {
  config.port = process.env.PORT;
}

module.exports = config;
