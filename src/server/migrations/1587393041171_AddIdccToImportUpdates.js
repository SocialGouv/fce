/* eslint-disable camelcase */
const tablename = "import_updates";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `INSERT INTO ${tablename} ("fournisseur", "si", "table") VALUES('','', 'etablissements_idcc')`
  );
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM ${tablename} WHERE table = 'etablissements_idcc'`);
};
