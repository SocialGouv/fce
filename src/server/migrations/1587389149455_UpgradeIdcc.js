/* eslint-disable camelcase */
const tablename = "etablissements_idcc";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns(tablename, "id");

  pgm.addColumn(tablename, {
    date_maj: {
      default: null,
      type: "character varying(30)",
      notNull: false,
    },
  });

  pgm.addColumn(tablename, {
    mois: {
      default: null,
      type: "character varying(30)",
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns(tablename, "mois");
  pgm.dropColumns(tablename, "date_maj");
};
