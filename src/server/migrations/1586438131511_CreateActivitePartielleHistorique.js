/* eslint-disable camelcase */
const tablename = "etablissements_activite_partielle_historique";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    siret: { type: "varchar(20)", notNull: false },
    num_convention: { type: "varchar(50)", notNull: false },
    date_decision: { type: "varchar(30)", notNull: false },
    num_avenant: { type: "smallint", notNull: false },
    da_init: { type: "varchar(3)", notNull: false },
    nb_h_auto_avn: { type: "numeric", notNull: false },
    nb_h_auto_cum: { type: "numeric", notNull: false },
    nb_h_conso_cum: { type: "numeric", notNull: false },
    cause: { type: "varchar(100)", notNull: false },
  });
  pgm.createIndex(tablename, "siret");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
