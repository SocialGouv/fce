const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codePostal = new Schema({
  code_postal: String,
  code_commune: String,
  libelle_commune: String,
});

module.exports = codePostal;
