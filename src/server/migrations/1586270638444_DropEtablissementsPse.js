/* eslint-disable camelcase */
const tablename = "etablissements_pse";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable(tablename);
};

exports.down = (pgm) => {
  pgm.createTable(tablename, {
    numero_de_dossier: { type: "varchar(100)", notNull: false },
    type_de_dossier: { type: "varchar(150)", notNull: false },
    date_d_enregistrement: { type: "varchar(30)", notNull: false },
    etat_du_dossier: { type: "varchar(100)", notNull: false },
    date_de_jugement: { type: "varchar(10)", notNull: false },
    situation_juridique: { type: "varchar(100)", notNull: false },
    siret: { type: "varchar(20)", notNull: false },
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
  pgm.createIndex(tablename, "siret");
};
