/* eslint-disable camelcase */
const tablename = "interactions_pole_3e_src";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    region: { type: "varchar(2)", notNull: false },
    siret: { type: "varchar(20)", notNull: true },
    numero_dossier: { type: "varchar(20)", notNull: false },
    type_controle: { type: "varchar(50)", notNull: false },
    date: { type: "varchar(10)", notNull: false }
  });
  pgm.createIndex(tablename, "siret");
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
