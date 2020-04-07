/* eslint-disable camelcase */
const tablename = "import_updates";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `INSERT INTO ${tablename} ("fournisseur", "si", "table") VALUES('','', 'rupco_etablissements')`
  );
  pgm.sql(
    `UPDATE ${tablename} SET "table" = 'rupco_procedures' WHERE "table" = 'etablissements_pse'`
  );
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM ${tablename} WHERE table = 'rupco_etablissements'`);
  pgm.sql(
    `UPDATE ${tablename} SET "table" = 'etablissements_pse' WHERE "table" = 'rupco_procedures'`
  );
};
