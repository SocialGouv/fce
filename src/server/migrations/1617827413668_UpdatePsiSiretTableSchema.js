/* eslint-disable camelcase */

const tablename = "psi_siret";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable("psi_siret");
  pgm.createTable(tablename, {
    id: "id",
    siret: { type: "varchar(20)", notNull: true, unique: true },
    salaries_annee_courante: { type: "integer" },
    salaries_annee_precedente: { type: "integer" },
  });

  pgm.createIndex(tablename, "siret");
};

exports.down = (pgm) => {
  pgm.dropTable("psi_siret");
  pgm.createTable(tablename, {
    id: "id",
    siret: {
      type: "varchar(20)",
      notNull: true,
      unique: true,
    },
    salaries_distincts: { type: "integer", notNull: true },
    year: { type: "varchar(4)" },
  });

  pgm.createIndex(tablename, "siret");
};
