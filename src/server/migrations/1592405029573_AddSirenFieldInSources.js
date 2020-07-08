/* eslint-disable camelcase */

exports.shorthands = undefined;

const tables = [
  { name: "etablissements_accords" },
  { name: "etablissements_activite_partielle" },
  { name: "etablissements_apprentissage" },
  { name: "etablissements_contrats_aides" },
  { name: "etablissements_dsn_eff" },
  { name: "etablissements_iae" },
  { name: "etablissements_idcc" },
  { name: "etablissements_uc_eff" },
  { name: "interactions_pole_3e" },
  { name: "interactions_pole_3e_src" },
  { name: "interactions_pole_c" },
  { name: "interactions_pole_t" },
  { name: "poles_competitivite" },
];

exports.up = (pgm) => {
  tables.forEach(({ name }) => {
    pgm.addColumn(name, {
      siren: {
        default: null,
        type: "varchar(9)",
        notNull: false,
      },
    });
    pgm.sql(`UPDATE ${name} SET siren = LEFT(siret, 9)`);
    pgm.createIndex(name, "siren");
  });
};

exports.down = (pgm) => {
  tables.forEach(({ name }) => {
    pgm.dropColumns(name, "siren");
  });
};
