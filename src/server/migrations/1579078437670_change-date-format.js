/* eslint-disable camelcase */

exports.shorthands = undefined;

const dateFieldConfig = {
  default: null,
  type: "character varying(30)",
  allowNull: true
};

const tables = [
  {
    table: "etablissements_accords",
    field: "dt_sign",
    oldFieldConfig: {
      default: null,
      type: "character varying(10)",
      allowNull: true
    }
  },
  {
    table: "etablissements_activite_partielle",
    field: "date_decision",
    oldFieldConfig: {
      default: null,
      type: "date",
      allowNull: true
    }
  },
  {
    table: "etablissements_dsn_eff",
    field: "mois",
    oldFieldConfig: {
      default: null,
      type: "date",
      allowNull: true
    }
  },
  {
    table: "etablissements_pse",
    field: "date_d_enregistrement",
    oldFieldConfig: {
      default: null,
      type: "character varying(10)",
      allowNull: true
    }
  },
  {
    table: "etablissements_uc_eff",
    field: "date_effphy_et",
    oldFieldConfig: {
      default: null,
      type: "character(8)",
      allowNull: true
    }
  },
  {
    table: "interactions_pole_3e",
    field: "date_visite",
    oldFieldConfig: {
      default: null,
      type: "character(10)",
      allowNull: true
    }
  },
  {
    table: "interactions_pole_3t",
    field: "date",
    oldFieldConfig: {
      default: null,
      type: "character(10)",
      allowNull: true
    }
  }
];

exports.up = pgm => {
  tables.forEach(({ table, field }) => {
    pgm.alterColumn(table, field, dateFieldConfig);
  });
};

exports.down = pgm => {
  tables.forEach(({ table, field, oldFieldConfig }) => {
    pgm.alterColumn(table, field, oldFieldConfig);
  });
};
