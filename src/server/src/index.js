import path from "path";
import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./api";
import frentreprise from "frentreprise";
import PG from "./frentreprise/datasources/PG/PG";

require("dotenv").config();
const config = require("config");
const app = express();
const port = (config.has("port") && +config.get("port")) || 80;
const host = (config.has("port") && config.get("host")) || undefined;

function init() {
  frentreprise.EntrepriseModel = require("./frentreprise/models/Entreprise");
  frentreprise.EtablissementModel = require("./frentreprise/models/Etablissement");
  frentreprise.setDb(require("./db/postgres"));

  const apiGouv = frentreprise.getDataSource("ApiGouv").source;
  apiGouv.token = config.get("APIGouv.token");
  apiGouv.axiosConfig = {
    ...apiGouv.axiosConfig,
    proxy: (config.has("proxy") && config.get("proxy")) || false
  };
  if (config.has("apiTimeout")) {
    apiGouv.axiosConfig.timeout = config.get("apiTimeout");
  }

  const sireneAPI = frentreprise.getDataSource("SireneAPI").source;
  sireneAPI.basicAuth = config.get("SireneAPI.basicAuth");

  if (config.has("SireneAPI.pagination")) {
    frentreprise.getDataSource("SireneAPI").pagination = config.get(
      "SireneAPI.pagination"
    );
  }
  sireneAPI.axiosConfig = {
    ...sireneAPI.axiosConfig,
    proxy: (config.has("proxy") && config.get("proxy")) || false
  };
  if (config.has("apiTimeout")) {
    sireneAPI.axiosConfig.timeout = config.get("apiTimeout");
  }

  if (config.has("postgres")) {
    frentreprise.addDataSource({
      name: "Postgres",
      priority: 50,
      source: new PG()
    });
  }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
}

function run() {
  const htdocs_path = path.resolve(__dirname, "./htdocs");
  app.use(express.static(htdocs_path));
  app.use("/api", apiRouter);

  app.get("*", function(req, res) {
    res.sendFile("index.html", { root: htdocs_path });
  });

  app.listen(
    {
      host,
      port
    },
    () => {
      console.log(`Serving files from: ${htdocs_path}`);
      console.log(`Listening on ${host || ""}:${port}`);
    }
  );

  return app;
}

init();
module.exports = run();
