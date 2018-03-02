var express = require("express");
var router = express.Router();
const frentreprise = __DIST
  ? require("frentreprise")
  : require("../../lib/frentreprise/src/frentreprise.js");

router.get("/search", function(req, res) {
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

module.exports = router;
