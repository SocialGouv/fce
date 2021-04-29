/* eslint-disable camelcase */

const tablename = "psi_siren";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    tablename,
    {
      id: "id",
      siren: { type: "varchar(20)", notNull: true },
      salaries_distincts: { type: "integer", notNull: true },
      year: { type: "varchar(4)" },
    },
    {
      ifNotExists: true,
    }
  );

  pgm.createIndex(tablename, "siren");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
