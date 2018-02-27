var express = require('express')
var app = express()
var frentreprise = require("frentreprise");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

//DB setup
mongoose.connect("mongodb://mongo:27017");


frentreprise.getDataSource("ApiGouv").source.token =
  "Wla5Sr8oyktnldY0QK67nlsjgIHqFKul";

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
