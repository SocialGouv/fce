var express = require("express");
var app = express();
var frentreprise = require("frentreprise");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("config");

var multer = require('multer');

//DB setup
var dbConfig = config.get("mongo.host") + "/" + config.get("mongo.db");
mongoose.connect("mongodb://" + dbConfig);

var DireccteEntreprise = require("./models/Entreprise");
var DireccteEtablissement = require("./models/Etablissement");

frentreprise.EntrepriseModel = DireccteEntreprise;
frentreprise.EtablissementModel = DireccteEtablissement;

frentreprise.getDataSource("ApiGouv").source.token = config.get("APIGouv.token");

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/search", function(req, res) {
  frentreprise.getEntreprise(req.query["q"]).then(
    ent => {
      res.send([ent.export()]);
    },
    err => {
      console.error(err);
      res.send(err);
    }
  );
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now();
    console.log(fileName);
    cb(null, fileName);
  }
})

var upload = multer({ storage: storage })

app.post('/upload',   upload.any(), function(req, res) {
  console.log("/upload");
  res.send("Uploaded ! ");
})

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(80, () => {
  console.log("Ready.");
});
