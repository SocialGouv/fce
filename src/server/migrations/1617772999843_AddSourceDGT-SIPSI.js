/* eslint-disable camelcase */
const tablename = "import_updates";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `INSERT INTO ${tablename} ("fournisseur", "si", "table") VALUES('DGT','SIPSI', 'psi_siren')`
  );
  pgm.sql(
    `INSERT INTO ${tablename} ("fournisseur", "si", "table") VALUES('DGT','SIPSI', 'psi_siret')`
  );
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM ${tablename} WHERE table = 'psi_siren'`);
  pgm.sql(`DELETE FROM ${tablename} WHERE table = 'psi_siret'`);
};
