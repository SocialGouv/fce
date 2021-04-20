/* eslint-disable camelcase */
const tablename = "import_updates";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `INSERT INTO ${tablename} ("fournisseur", "si", "table","date") VALUES('DGT','SIPSI', 'psi_siren', '2021-04-02')`
  );
  pgm.sql(
    `INSERT INTO ${tablename} ("fournisseur", "si", "table","date") VALUES('DGT','SIPSI', 'psi_siret', '2021-04-02')`
  );
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM ${tablename} WHERE table = 'psi_siren'`);
  pgm.sql(`DELETE FROM ${tablename} WHERE table = 'psi_siret'`);
};
