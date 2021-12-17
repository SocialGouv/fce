/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("accidents_travail", {
    siret: {
      type: "varchar(15)",
      notNull: true,
    },
    siren: {
      type: "varchar(9)",
      notNull: true,
    },
    total: {
      type: "integer",
      notNull: true,
    },
    mortels: {
      type: "integer",
      notNull: true,
    },
    avec_arret_travail: {
      type: "integer",
      notNull: true,
    },
    sans_arret_travail: {
      type: "integer",
      notNull: true,
    },
    code_naf_niv1: "varchar(1)",
    pour_1000: "float8",
    pour_1000_secteur_national: "float8",
    pour_1000_secteur_regional: "float8",
  });

  pgm.createIndex("accidents_travail", "siret");
  pgm.createIndex("accidents_travail", "siren");

  pgm.sql(`INSERT INTO import_updates (fournisseur, si, "table") VALUES
        ('DAT', 'DAT', 'accidents_travail')`);
};

exports.down = (pgm) => {
  pgm.dropTable("accidents_travail");
};
