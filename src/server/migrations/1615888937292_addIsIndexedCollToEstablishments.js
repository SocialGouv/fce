/* eslint-disable camelcase */
const tablename = "etablissements";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns(
    tablename,
    { appsearch_indexed: { type: "boolean", notNull: true, default: false } },
    { ifNotExists: true }
  );
};

exports.down = pgm => {
  pgm.dropColumns(tablename, ["appsearch_indexed"]);
};
