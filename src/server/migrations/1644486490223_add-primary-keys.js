/* eslint-disable camelcase */

exports.shorthands = undefined;

const ENTREPRISE_PKEY_CONSTRAINT_NAME = "entreprises_pkey";

exports.up = pgm => {
  pgm.addConstraint("entreprises", ENTREPRISE_PKEY_CONSTRAINT_NAME, {
    primaryKey: "siren"
  });
};

exports.down = pgm => {
  pgm.dropConstraint("entreprises", ENTREPRISE_PKEY_CONSTRAINT_NAME);
};
