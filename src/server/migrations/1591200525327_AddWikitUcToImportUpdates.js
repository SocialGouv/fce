/* eslint-disable camelcase */
const tablename = "import_updates";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `INSERT INTO ${tablename} ("fournisseur", "si", "table") VALUES('','', 'wikit_uc')`
  );
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM ${tablename} t WHERE t.table = 'wikit_uc'`);
};
