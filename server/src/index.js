var frentreprise = require("frentreprise");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

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
