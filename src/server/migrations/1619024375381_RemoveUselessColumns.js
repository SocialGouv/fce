/* eslint-disable camelcase */
const tablename = "etablissements_apprentissage";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns(tablename, "empty", { ifExists: true });
  pgm.dropColumns(tablename, "empty2", { ifExists: true });
};

exports.down = (pgm) => {
  pgm.addColumns(tablename, {
    empty: { type: "varchar(10)", notNull: false },
    empty2: { type: "varchar(10)", notNull: false },
  });
};
