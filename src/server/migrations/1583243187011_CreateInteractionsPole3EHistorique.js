/* eslint-disable camelcase */
const tablename = "interactions_pole_3e_historique";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    siret: { type: "varchar(20)", notNull: true },
    date_visite: { type: "varchar(30)", notNull: false },
    region: { type: "varchar(100)", notNull: false },
    inspecteurs: { type: "varchar(255)", notNull: false },
    filieres: { type: "varchar(255)", notNull: false },
    type_suivi: { type: "varchar(255)", notNull: false },
    suivi_eti: { type: "varchar(255)", notNull: false }
  });
  pgm.createIndex(tablename, "siret");
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
