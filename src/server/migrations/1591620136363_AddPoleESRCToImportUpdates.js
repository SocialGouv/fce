/* eslint-disable camelcase */

const tablename = "import_updates";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `UPDATE ${tablename} SET "table" = 'interactions_pole_3e_src' WHERE "si" = 'MDF'`
  );
};

exports.down = (pgm) => {
  pgm.sql(`UPDATE ${tablename} SET "table" = '' WHERE "si" = 'MDF'`);
};
