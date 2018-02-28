const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nomenclatureSchema = new Schema({
  categorie: { type: String, index: true },
  code: String,
  libelle: String,
  libelle_court: String,
  libelle_CJ3: String,
  libelle_CJ1: String,
});

nomenclatureSchema.statics.findByCode = function(categorie, code, cb) {
  return this.find({ categorie, code }, cb);
};

const Nomenclature = mongoose.model("Nomenclature", nomenclatureSchema);

module.exports = Nomenclature;
