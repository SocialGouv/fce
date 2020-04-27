/* eslint-disable camelcase */
const tablename = "rupco_etablissements";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    numero: { type: "integer", notNull: false, unsigned: true },
    type: { type: "varchar(150)", notNull: false },
    date_enregistrement: { type: "varchar(25)", notNull: false },
    siren: { type: "varchar(9)", notNull: false },
    date_jugement: { type: "varchar(10)", notNull: false },
    situation_juridique: { type: "varchar(100)", notNull: false },
    siren_etablissement: { type: "varchar(9)", notNull: false },
    siret: { type: "varchar(14)", notNull: false },
    effectif_etablissement: { type: "integer", notNull: false, unsigned: true },
    nombre_de_ruptures_de_contrats_en_debut_de_procedure: {
      type: "integer",
      notNull: false,
      unsigned: true,
    },
    nombre_de_ruptures_de_contrats_en_fin_de_procedure: {
      type: "integer",
      notNull: false,
      unsigned: true,
    },
  });
  pgm.createIndex(tablename, "numero");
  pgm.createIndex(tablename, "siren");
  pgm.createIndex(tablename, "siret");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
