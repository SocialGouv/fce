/* eslint-disable camelcase */
const tablename = "etablissements_dsn_effectif";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn(tablename, "siren");
  pgm.sql(
    `CREATE INDEX etablissements_effectif_siret ON etablissement_dsn_effectif USING btree (siret)`
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
