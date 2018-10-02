const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departementSchema = new Schema({
  code_departement: { type: String, index: true },
  libelle_departement: String
});

const Departement = mongoose.model("Departement", departementSchema);

departementSchema.statics.findOneByCode = function(code_departement, cb) {
  return this.findOneByCode({ code_departement }, cb);
};

module.exports = Departement;
