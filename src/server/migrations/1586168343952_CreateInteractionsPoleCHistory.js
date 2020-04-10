/* eslint-disable camelcase */
const tablename = "interactions_pole_c_historique";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    siret: { type: "varchar(20)", notNull: true },
    annee: { type: "varchar(4)", notNull: false },
    mois: { type: "varchar(10)", notNull: false },
    jour: { type: "varchar(2)", notNull: false },
    suite: { type: "boolean", notNull: false },
    unite: { type: "varchar(255)", notNull: false },
    messagerie: { type: "varchar(255)", notNull: false },
    date: { type: "varchar(10)", notNull: false },
  });
  pgm.createIndex(tablename, "siret");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
