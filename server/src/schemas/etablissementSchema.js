const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const etablissementSchema = new Schema({
  siege_social: Boolean,
  siret: String,
  naf: String,
  libelle_naf: String,
  date_mise_a_jour: Date,
  etat_administratif_etablissement: {
    value: String,
    date_mise_a_jour: Date
  },
  adresse: {
    l1: String,
    l2: String,
    l3: String,
    l4: String,
    l5: String,
    l6: String,
    l7: String,
    numero_voie: String,
    type_voie: String,
    nom_voie: String,
    complement_adresse: String,
    code_postal: String,
    localite: String,
    code_insee_localite: String
  }
});

module.exports = etablissementSchema;
