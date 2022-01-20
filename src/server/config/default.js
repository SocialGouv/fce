require("dotenv").config();

const process = require("process");

const config = {
  elastic: {
    url: process.env.ELASTIC_URL,
    apiKey: process.env.ELASTIC_API_KEY,
    index: process.env.ELASTIC_INDEX,
  },
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
    ssl: process.env.PG_SSL === "true",
  },
  hasura: {
    url: process.env.HASURA_URL,
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
  sentryUrlKey:
    "https://fecf5988311f413c9bba70e80454cc3a@sentry.fabrique.social.gouv.fr/35",
  mail: JSON.parse(process.env.MAIL_TRANSPORT_CONFIG),
  proxy: false,
  apiTimeout: 25000,
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
  credential: {
    token: process.env.CREDENTIAL_API_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
    expireTemporary: process.env.JWT_TEMP_EXPIRE,
    expireBefore: +process.env.JWT_EXPIRE_BEFORE,
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
      "-": "Non référencé",
      SP: "Secteur public",
      "0 salarié": "0 salarié (pas d'effectif au 31/12 )",
      "01": "1 ou 2 salariés",
      "02": "3 à 5 salariés",
      "03": "6 à 9 salariés",
      11: "10 à 19 salariés",
      12: "20 à 49 salariés",
      21: "50 à 99 salariés",
      22: "100 à 249 salariés",
      31: "250 à 499 salariés",
      32: "500 à 999 salariés",
      41: "1 000 à 1 999 salariés",
      42: "2 000 à 4 999 salariés",
      51: "5 000 salariés et plus",
    },
  },
  sanitizeTables: [
    {
      fields: ["numero"],
      table: "rupco_procedures",
      hasId: true,
      filterField: "date_enregistrement",
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
  emailSalt: process.env.EMAIL_SALT,
  effectif_dsn: {
    exclude: [],
  },
  host: process.env.HOST || "127.0.0.1",
  port: process.env.PORT || 80,
  api: {
    requestsPer10Seconds: 20,
  },
};

module.exports = config;
