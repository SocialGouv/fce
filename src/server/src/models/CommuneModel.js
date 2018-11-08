const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communeSchema = new Schema({
  code_commune: { type: String, index: true },
  libelle_commune: String
});

const Commune = mongoose.model("Commune", communeSchema);

module.exports = Commune;
