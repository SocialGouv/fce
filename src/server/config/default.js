require("dotenv").config();
const process = require("process");

const config = {
  client: {
    baseUrl: process.env.CLIENT_BASE_URL,
    magicLink: "/magic-link/{key}"
  },
  APIGouv: {
    token: process.env.API_GOUV_TOKEN
  },
  SireneAPI: {
    enable: true,
    basicAuth: process.env.API_SIRENE_BASIC_AUTH,
    pagination: {
      itemsByPage: 15
    }
  },
  postgres: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB
  },
  mail: JSON.parse(process.env.MAIL),
  proxy: false,
  apiTimeout: 30000,
  magicKey: {
    allowedEmails: JSON.parse(process.env.MAGIC_KEY_ALLOWED_EMAILS).map(
      mask => new RegExp(mask)
    ),
    privateKey: process.env.MAGIC_KEY_PRIVATE_KEY,
    clientVerification: true,
    expire: process.env.MAGIC_KEY_EXPIRE
  },
  magicLink: {
    bcc: process.env.MAGIC_LINK_BCC
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE
  },
  elasticIndexer: {
    client_address: "http://172.10.0.2:9200/",
    cursor_size: 30000,
    enterpriseFields: [
      "denominationunitelegale",
      "nomunitelegale",
      "nomusageunitelegale",
      "siren"
    ],
    properties: {
      id: { type: "keyword" },
      siren: { type: "keyword" },
      siret: { type: "keyword" },
      trancheeffectifsetablissement: { type: "keyword" },
      etablissementsiege: { type: "keyword" },
      etatadministratifetablissement: { type: "keyword" },
      codepostaletablissement: { type: "keyword" },
      libellecommuneetablissement: { type: "keyword" },
      trancheeffectifsetablissement: { type: "keyword" },
      activiteprincipaleetablissement: { type: "keyword" },
      activiteprincipaleetablissement_libelle: { type: "keyword" }
    }
  }
};

if (process.env.HOST) {
  config.host = process.env.HOST;
}

if (process.env.PORT) {
  config.port = process.env.PORT;
}

module.exports = config;
