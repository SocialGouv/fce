/* eslint-disable camelcase */
const tablename = "rupco_procedures";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns(
    tablename,
    { historique_si: { type: "boolean", notNull: true, default: false } },
    { ifNotExists: true }
  );
};

exports.down = (pgm) => {
  pgm.dropColumns(tablename, ["historique_si"]);
};
