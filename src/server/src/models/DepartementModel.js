const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departementSchema = new Schema({
  code_departement: { type: String, index: true },
  libelle_departement: String
});

departementSchema.statics.findOneByCode = function(code_departement, cb) {
  return this.findOne({ code_departement }, cb);
};

const Departement = mongoose.model("Departement", departementSchema);

module.exports = Departement;
