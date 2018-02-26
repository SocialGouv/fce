const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nomenclatureSchema = new Schema({
  categorie: String,
  code: String,
  libelle: Date,
  libelle_court: String,
  libelle_CJ3: String,
  libelle_CJ1: String,
});

module.exports = nomenclatureSchema;
