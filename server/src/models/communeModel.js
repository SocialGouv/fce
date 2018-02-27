const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communeSchema = new Schema({
  code_commune: String,
  libelle_commune: String
});

const Commune = mongoose.model("Commune", communeSchema);

module.exports = Commune;
