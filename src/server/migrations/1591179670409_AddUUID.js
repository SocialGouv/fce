/* eslint-disable camelcase */

exports.shorthands = undefined;

const tables = [
  { name: "categorie_juridique", dropId: false },
  { name: "etablissements_accords", dropId: false },
  { name: "etablissements_activite_partielle", dropId: false },
  { name: "etablissements_activite_partielle_historique", dropId: false },
  { name: "etablissements_apprentissage", dropId: false },
  { name: "etablissements_contrats_aides", dropId: true },
  { name: "etablissements_dsn_eff", dropId: false },
  { name: "etablissements_iae", dropId: true },
  { name: "etablissements_idcc", dropId: false },
  { name: "etablissements_successions", dropId: false },
  { name: "etablissements_uc_eff", dropId: true },
  { name: "interactions_pole_3e", dropId: true },
  { name: "interactions_pole_3e_historique", dropId: false },
  { name: "interactions_pole_3e_src", dropId: false },
  { name: "interactions_pole_c", dropId: false },
  { name: "interactions_pole_c_historique", dropId: false },
  { name: "interactions_pole_t", dropId: true },
  { name: "interactions_pole_t_historique", dropId: false },
  { name: "poles_competitivite", dropId: true },
  { name: "regions", dropId: false },
  { name: "rupco_etablissements", dropId: false },
  { name: "rupco_procedures", dropId: false },
];

exports.up = (pgm) => {
  pgm.sql(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  tables.forEach(({ name, dropId }) => {
    if (dropId) {
      pgm.sql(`ALTER TABLE ${name} DROP COLUMN id`);
    }
    pgm.sql(
      `ALTER TABLE ${name} ADD COLUMN id uuid DEFAULT uuid_generate_v4 () NOT NULL`
    );
  });
};

exports.down = (pgm) => {
  tables.forEach(({ name, dropId }) => {
    if (dropId) {
      pgm.sql(
        `ALTER TABLE ${name} ADD COLUMN id integer DEFAULT nextval('public.${name}_id_seq') NOT NULL`
      );
    } else {
      pgm.sql(`ALTER TABLE ${name} DROP COLUMN id`);
    }
  });
};
