var path = require("path");
var frentreprise = require("../lib/frentreprise/src/frentreprise");
var express = require("express");
var app = express();
var frentreprise = require("frentreprise");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("config");
var apiRouter = require("./api");

//DB setup
if (config.has("mongo")) {
  mongoose.connect(config.get("mongodb"));
}

var DireccteEntreprise = require("./models/Entreprise");
var DireccteEtablissement = require("./models/Etablissement");

frentreprise.EntrepriseModel = DireccteEntreprise;
frentreprise.EtablissementModel = DireccteEtablissement;

frentreprise.getDataSource("ApiGouv").source.token = config.get(
  "APIGouv.token"
);

console.log(__dirname);
const htdocs_path = path.resolve(__dirname, "./htdocs");
console.log(`Serving files from: ${htdocs_path}`);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(htdocs_path));

app.use("/api", apiRouter);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
