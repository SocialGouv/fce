const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const etablissementSchema = new Schema({
  siret: String,
  nic_ministere: String,
  siren: String,
  code_CJ3: String,
  libelle_CJ3: String,
  raison_sociale: String,
  nom: String,
  prenom: String,
  enseigne: String,
  nom_commercial: String,
  sigle: String,
  code_etat: String,
  libelle_etat: String,
  date_de_l_etat: Date,

  code_naf2_10: String,
  code_naf2_38: String,

  code_activite: String, // code NAF
  libelle_activite: String,
  date_debut_activite: Date,

  code_qualite_siege: String,
  libelle_qualite_siege: String,
  nic_du_siege: String,
  tranche_eff__insee: String,
  libelle_tranche_eff__insee: String,
  annee_tranche_eff_: String,
  dernier_eff__physique: String,
  date_der_eff_physique: Date,
  source_dernier_eff_phy: String,
  libelle_source_dernier_eff_phy: String,

  code_employeur: String,
  date_employeur: Date,
  date_de_creation: Date,
  code_modalite_activ_: String,
  libelle_modalite_activ_: String,
  code_marchand: String,
  code_region: String,
  label_region: String,
  code_departement: String,

  code_section: String,

  numero_voie: String,
  code_indice_repetition: String,
  code_type_de_voie: String,
  libelle_voie: String,
  complement_adresse: String,
  code_postal: String,
  code_commune: String,
  libelle_commune: String,
  annee_idcc: String,
  codes_idcc: String,
  label_idcc: String
});

etablissementSchema.statics.findBySIRET = (siret, cb) => {
  return this.findOne({ siret: siret }, cb);
};

etablissementSchema.statics.findByRaisonSociale = (raisonSociale, cb) => {
  return this.find({ raison_sociale: new RegExp(raisonSociale, "i") }, cb);
};

const Etablissement = mongoose.model("Etablissement", etablissementSchema);

module.exports = Etablissement;
