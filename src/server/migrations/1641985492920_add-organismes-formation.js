/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("organismes_formation", {
    siret: {
      type: "varchar(15)",
      notNull: true,
    },
    siren: {
      type: "varchar(9)",
      notNull: true,
    },
    numero_declaration_activite: {
      type: "varchar(11)",
      notNull: true,
    },
    denomination: {
      type: "varchar(255)",
      notNull: true,
    },
    actions_de_formation: "bool",
    bilans_de_competences: "bool",
    vae: "bool",
    actions_de_formation_par_apprentissage: "bool",
    organisme_etranger_represente_denomination: "varchar(255)",
    code_specialite_1: "varchar(3)",
    libelle_specialite_1: "varchar(255)",
    code_specialite_2: "varchar(3)",
    libelle_specialite_2: "varchar(255)",
    code_specialite_3: "varchar(3)",
    libelle_specialite_3: "varchar(255)",
    nb_stagiaires: "integer",
    nb_stagiaires_confies_par_un_autre_of: "integer",
    effectif_formateurs: "integer",
  });

  pgm.createIndex("organismes_formation", "siret");
  pgm.createIndex("organismes_formation", "siren");

  pgm.sql(`INSERT INTO import_updates (fournisseur, si, "table") VALUES
        ('OF', 'OF', 'organismes_formation')`);
};

exports.down = (pgm) => {
  pgm.dropTable("organismes_formation");
};
