const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codePostalSchema = new Schema({
  code_postal: String,
  code_commune: String,
  libelle_commune: String
});

const CodePostal = mongoose.model("CodePostal", codePostalSchema);


codePostalSchema.statics.findOneByCode = function(code_postal, cb) {
  return this.findOne({ code_postal }, cb);
};


module.exports = CodePostal;
