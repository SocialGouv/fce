var debug = true;
var path = require("path");
var frentreprise = debug
  ? require("../lib/frentreprise/src/frentreprise")
  : require("frentreprise");
var express = require("express");
var app = express();
var frentreprise = require("frentreprise");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("config");

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
app.use(express.static(htdocs_path));

app.get("/api/search", function(req, res) {
  const query = (req.query["q"] || "").trim();
  const data = {
    query: {
      q: query,
      isSIRET: frentreprise.isSIRET(query),
      isSIREN: frentreprise.isSIREN(query)
    }
  };

  const logError = err => {
    console.error(err);
    data.error = true;
    try {
      data.message = err.toString();
    } catch (Exception) {}
  };

  let freCall;

  if (data.query.isSIREN || data.query.isSIRET) {
    freCall = frentreprise.getEntreprise(data.query.q).then(entreprise => {
      data.results = [entreprise.export()];
    }, logError);
  } else {
    freCall = frentreprise.search(data.query.q).then(results => {
      data.results = results;
    }, logError);
  }

  freCall.then(() => {
    res.send(data);
  });
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
