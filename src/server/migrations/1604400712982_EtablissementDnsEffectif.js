/* eslint-disable camelcase */
const tablename = "etablissements_dsn_effectif";
const fields = [
  "hommes",
  "femmes",
  "cdd",
  "cdi",
  "cdi_inter",
  "inter_mission",
  "interim",
];

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    tablename,
    {
      siret: {
        default: null,
        type: "character varying(20)",
        notNull: false,
      },
      eff: {
        type: "integer",
        notNull: false,
      },
      mois: {
        default: null,
        type: "character varying(30)",
        notNull: false,
      },
      date_maj: {
        default: null,
        type: "character varying(30)",
        notNull: false,
      },
    },
    {
      ifNotExists: true,
    }
  );
  fields.forEach((field) => {
    pgm.addColumn(tablename, { [field]: { type: "integer", default: 0 } });
  });
  pgm.sql(
    `ALTER TABLE ${tablename} ADD COLUMN id uuid DEFAULT uuid_generate_v4 () NOT NULL`
  );
  pgm.addColumn(tablename, {
    siren: {
      default: null,
      type: "varchar(9)",
      notNull: false,
    },
  });
  pgm.sql(`UPDATE ${tablename} SET siren = LEFT(siret, 9)`);
  pgm.createIndex(tablename, "siren");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
