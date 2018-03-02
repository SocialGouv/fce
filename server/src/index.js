import path from "path";

import config from "config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import Mongo from "./frentreprise/datasources/Mongo";

import apiRouter from "./api";

const frentreprise = __DIST
  ? require("frentreprise")
  : require("../lib/frentreprise/src/frentreprise.js");

const app = express();
const port = (config.has("port") && +config.get("port")) || 80;
const host = (config.has("port") && config.get("host")) || undefined;

function init() {
  frentreprise.EntrepriseModel = require("./frentreprise/models/Entreprise");
  frentreprise.EtablissementModel = require("./frentreprise/models/Etablissement");
  frentreprise.getDataSource("ApiGouv").source.token = config.get(
    "APIGouv.token"
  );

  //DB setup
  if (config.has("mongo")) {
    mongoose.connect(config.get("mongo"));

    frentreprise.addDataSource({
      name: "Mongo",
      priority: 50, // higher prevail
      source: new Mongo()
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
}

init();
run();
