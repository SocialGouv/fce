const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectManipulations = require("../utils/ObjectManipulations");

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

etablissementSchema.statics.findSIRETsBySIREN = function(siren, cb) {
  return this.find({ siren }).distinct("siret", cb);
};

etablissementSchema.statics.findByRaisonSociale = function(raisonSociale, cb) {
  const regex = new RegExp(raisonSociale, "i");

  return this.aggregate(
    [
      {
        $match: { $or: [{ raison_sociale: regex }, { nom: regex }] }
      },
      {
        $lookup: {
          from: "interactions",
          localField: "siret",
          foreignField: "siret",
          as: "interactions"
        }
      },
      {
        $sort: { raison_sociale: 1, code_etat: 1 }
      }
    ],
    cb
  );
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
  const onlySiegeSocial = searchParams.siege_social;
  const interactions = searchParams.interactions;

  const params = {
    ...searchParams
  };

  delete params.raison_sociale;
  delete params.siege_social;
  delete params.interactions;

  if (raisonSocialParam) {
    params["$or"] = [
      { raison_sociale: raisonSocialParam },
      { nom: raisonSocialParam }
    ];
  }
  ObjectManipulations.clean(params);

  let aggregateConfig = [
    {
      $match: params
    },
    {
      $project: {
        root: "$$ROOT",
        siretSiege: { $concat: ["$siren", "$nic_du_siege"] }
      }
    },
    {
      $lookup: {
        from: "interactions",
        localField: "root.siret",
        foreignField: "siret",
        as: "interactions"
      }
    },
    {
      $sort: { "root.raison_sociale": 1, "root.code_etat": 1 }
    }
  ];

  if (onlySiegeSocial) {
    aggregateConfig.push({
      $redact: {
        $cond: [{ $eq: ["$root.siret", "$siretSiege"] }, "$$KEEP", "$$PRUNE"]
      }
    });
  }

  return this.aggregate(aggregateConfig, cb).then(result => {
    if (Array.isArray(result)) {
      result = result.map(line => {
        return {
          ...line,
          ...line.root
        };
      });

      if (interactions && interactions.length) {
        result = result.filter(line => {
          return line.interactions.filter(interaction => {
            return interactions.includes(interaction.pole);
          }).length;
        });
      }
    }
    return result;
  });
};

const Etablissement = mongoose.model("Etablissement", etablissementSchema);

Etablissement.findDisctinct = function(entity) {
  return Etablissement.distinct(entity).then(data => {
    return data.sort();
  });
};

Etablissement.findDisctinctCommunes = function() {
  return Etablissement.findDisctinct("libelle_commune");
};

Etablissement.findDisctinctCodesPostaux = function() {
  return Etablissement.findDisctinct("code_postal");
};

Etablissement.findDisctinctDepartements = function() {
  return Etablissement.findDisctinct("code_departement");
};

module.exports = Etablissement;
