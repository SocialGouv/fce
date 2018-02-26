const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interactionSchema = new Schema({
  siret: String,
  date: Date,
  unite: String,
  type_intervention: String,
  cible_intervention: String,
  pole: String
});

module.exports = interactionSchema;
