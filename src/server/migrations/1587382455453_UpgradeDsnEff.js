/* eslint-disable camelcase */
const tablename = "etablissements_dsn_eff";
const newIntegerFields = [
  "hommes",
  "femmes",
  "cdd",
  "cdi",
  "cdi_inter",
  "inter_mission",
  "interim",
];

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns(tablename, "id");

  newIntegerFields.forEach((field) => {
    pgm.addColumn(tablename, { [field]: { type: "integer", default: 0 } });
  });

  pgm.addColumn(tablename, {
    date_maj: {
      default: null,
      type: "character varying(30)",
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  newIntegerFields.forEach((field) => {
    pgm.dropColumns(tablename, field);
  });
  pgm.dropColumns(tablename, "date_maj");
};
