const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deleteKeyIfNotDefinedOrEmpty = require("../utils/ObjectManipulations")
  .deleteKeyIfNotDefinedOrEmpty;

const etablissementSchema = new Schema({
  siret: { type: String, index: true },
  nic_ministere: String,
  siren: String,
  code_cj3: String,
  libelle_cj3: String,
  raison_sociale: String,
  nom: String,
  prenom: String,
  enseigne: String,
  nom_commercial: String,
  sigle: String,
  code_etat: String,
  libelle_etat: String,
  date_de_l_etat: String,

  code_naf2_10: String,
  code_naf2_38: String,

  code_activite: String, // code NAF
  libelle_activite: String,
  date_debut_activite: String,

  code_qualite_siege: String,
  libelle_qualite_siege: String,
  nic_du_siege: String,
  tranche_eff__insee: String,
  libelle_tranche_eff__insee: String,
  annee_tranche_eff_: String,
  dernier_eff__physique: String,
  date_der_eff_physique: String,
  source_dernier_eff_phy: String,
  libelle_source_dernier_eff_phy: String,

  code_employeur: String,
  date_employeur: String,
  date_de_creation: String,
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
  label_idcc: String,

  sese: Object
});

etablissementSchema.statics.findBySIRET = function(siret, cb) {
  return this.findOne({ siret: siret }, cb);
};

etablissementSchema.statics.findByRaisonSociale = function(raisonSociale, cb) {
  return this.find({ raison_sociale: new RegExp(raisonSociale, "i") }, cb);
};

/**
 * @param {object} searchParams = {
 raison_sociale,
 code_activite,
 libelle_commune,
 code_postal,
 code_departement
}
 */
etablissementSchema.statics.findByAdvancedSearch = function(searchParams, cb) {
  const raisonSocialParam =
    searchParams && searchParams.raison_sociale
      ? new RegExp(searchParams.raison_sociale, "i")
      : null;

  const params = {
    ...searchParams,
    raison_sociale: raisonSocialParam
  };

  Object.keys(params).forEach(field => {
    deleteKeyIfNotDefinedOrEmpty(params, field);
  });

  return this.find(params, cb);
};

const Etablissement = mongoose.model("Etablissement", etablissementSchema);

module.exports = Etablissement;
