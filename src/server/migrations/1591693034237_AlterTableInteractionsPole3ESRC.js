/* eslint-disable camelcase */

exports.shorthands = undefined;

const tablename = "interactions_pole_3e_src";

exports.up = (pgm) => {
  pgm.addColumns(
    tablename,
    {
      numero_etablissement: {
        type: "varchar(5)",
        allowNull: true,
        default: null,
      },
      libelle_region: {
        type: "varchar(255)",
        allowNull: true,
        default: null,
      },
      date_derniere_modification: {
        type: "varchar(30)",
        allowNull: true,
        default: null,
      },
      date_cloture: {
        type: "varchar(30)",
        allowNull: true,
        default: null,
      },
      cols: {
        type: "varchar(3)",
        allowNull: true,
        default: null,
      },
      clos_automatiquement: {
        type: "varchar(3)",
        allowNull: true,
        default: null,
      },
      nature_controle: {
        type: "varchar(255)",
        allowNull: true,
        default: null,
      },
      cible_controle: {
        type: "varchar(255)",
        allowNull: true,
        default: null,
      },
    },
    { ifNotExists: true }
  );

  pgm.alterColumn(tablename, "date", {
    default: null,
    type: "varchar(30)",
    allowNull: true,
  });

  pgm.alterColumn(tablename, "siret", {
    default: null,
    type: "varchar(30)",
    notNull: false,
  });
};

exports.down = (pgm) => {
  pgm.dropColumns(tablename, [
    "numero_etablissement",
    "libelle_region",
    "date_derniere_modification",
    "date_cloture",
    "cols",
    "clos_automatiquement",
    "nature_controle",
    "cible_controle",
  ]);

  pgm.alterColumn(tablename, "date", {
    default: null,
    type: "varchar(10)",
    allowNull: true,
  });

  pgm.alterColumn(tablename, "siret", {
    default: null,
    type: "varchar(30)",
    notNull: true,
  });
};
