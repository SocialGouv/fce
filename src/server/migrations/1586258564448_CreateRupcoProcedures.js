/* eslint-disable camelcase */
const tablename = "rupco_procedures";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    numero: { type: "integer", notNull: false, unsigned: true },
    type: { type: "varchar(150)", notNull: false },
    date_enregistrement: { type: "varchar(25)", notNull: false },
    etat: { type: "varchar(100)", notNull: false },
    siren: { type: "varchar(9)", notNull: false },
    effectif_entreprise: { type: "integer", notNull: false, unsigned: true },
    effectif_groupe: { type: "integer", notNull: false, unsigned: true },
    nom_groupe: { type: "varchar(255)", notNull: false },
    date_jugement: { type: "varchar(10)", notNull: false },
    situation_juridique: { type: "varchar(100)", notNull: false },
  });
  pgm.createIndex(tablename, "numero");
  pgm.createIndex(tablename, "siren");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
