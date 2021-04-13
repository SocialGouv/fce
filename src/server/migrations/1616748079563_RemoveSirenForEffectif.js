/* eslint-disable camelcase */
const tablename = "psi_siren";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn(tablename, "siren");
  pgm.sql(
    `CREATE INDEX etablissement_effectif_siret ON etablissements_dsn_effectif USING btree (siret)`
  );
};

exports.down = (pgm) => {
  pgm.addColumn(tablename, {
    siren: {
      default: null,
      type: "varchar(9)",
      notNull: false,
    },
  });
};
