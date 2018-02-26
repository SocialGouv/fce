const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communeSchema = new Schema({
  code_commune: String,
  libelle_commune: String,
});

module.exports = communeSchema;
