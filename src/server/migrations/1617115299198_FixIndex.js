/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `CREATE INDEX etablissements_effectif_siret ON etablissements_dsn_effectif USING btree (siret)`
  );
};

exports.down = (pgm) => {};
