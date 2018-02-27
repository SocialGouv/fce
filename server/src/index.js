var express = require("express");
var app = express();
var frentreprise = require("frentreprise");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("config");

//DB setup
var dbConfig = config.get("mongo.host") + "/" + config.get("mongo.db");
mongoose.connect("mongodb://" + dbConfig);

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

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(80, () => {
  console.log("Ready.");
});
