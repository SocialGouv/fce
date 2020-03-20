import path from "path";
import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./api";
import frentreprise from "frentreprise";
import PG from "./frentreprise/datasources/PG/PG";
import postgres from "./db/postgres";
import EntrepriseModel from "./frentreprise/models/Entreprise";
import EtablissementModel from "./frentreprise/models/Etablissement";

require("dotenv").config();
const config = require("config");
const app = express();
const port = (config.has("port") && +config.get("port")) || 80;
const host = (config.has("port") && config.get("host")) || undefined;

function init() {
  frentreprise.EntrepriseModel = EntrepriseModel;
  frentreprise.EtablissementModel = EtablissementModel;
  frentreprise.setDb(postgres);

  const apiGouv = frentreprise.getDataSource("ApiGouv").source;
  apiGouv.token = config.get("APIGouv.token");
  apiGouv.axiosConfig = {
    ...apiGouv.axiosConfig,
    proxy: (config.has("proxy") && config.get("proxy")) || false
  };
  if (config.has("apiTimeout")) {
    apiGouv.axiosConfig.timeout = config.get("apiTimeout");
  }

  const sireneAPIConfig =
    (config.has("SireneAPI") && config.get("SireneAPI")) || null;
  if (sireneAPIConfig && sireneAPIConfig.enable) {
    const sireneAPI = frentreprise.getDataSource("SireneAPI").source;
    sireneAPI.basicAuth = sireneAPIConfig.basicAuth;

    if (sireneAPIConfig.pagination) {
      frentreprise.getDataSource("SireneAPI").pagination =
        sireneAPIConfig.pagination;
    }
    sireneAPI.axiosConfig = {
      ...sireneAPI.axiosConfig,
      proxy: (config.has("proxy") && config.get("proxy")) || false
    };
    if (config.has("apiTimeout")) {
      sireneAPI.axiosConfig.timeout = config.get("apiTimeout");
    }
  }

  if (config.has("db")) {
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
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
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
export default run();
