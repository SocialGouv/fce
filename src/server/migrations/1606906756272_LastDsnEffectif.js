/* eslint-disable camelcase */

exports.shorthands = undefined;

const tablename = "last_dsn_effectif";

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    siret: {
      default: null,
      type: "character varying(20)",
      notNull: false,
    },
    trancheeffectifsetablissement: {
      type: "character varying(20)",
      notNull: false,
    },
    mois: {
      default: null,
      type: "character varying(30)",
      notNull: false,
    },
    effectif: {
      type: "integer",
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
