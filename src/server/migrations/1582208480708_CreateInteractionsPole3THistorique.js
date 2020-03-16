/* eslint-disable camelcase */
const tablename = "interactions_pole_t_historique";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    siret: { type: "varchar(20)", notNull: true },
    type_intervention: { type: "varchar(255)", notNull: false },
    date: { type: "varchar(30)", notNull: false },
    realise_pour: { type: "varchar(255)", notNull: false },
    action_sur: { type: "varchar(255)", notNull: false },
    intervenant: { type: "varchar(255)", notNull: false }
  });
  pgm.createIndex(tablename, "siret");
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
