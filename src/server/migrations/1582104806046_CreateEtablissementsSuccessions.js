/* eslint-disable camelcase */
const tablename = "etablissements_successions";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    siretetablissementpredecesseur: { type: "varchar(20)", notNull: true },
    siretetablissementsuccesseur: { type: "varchar(20)", notNull: true },
    dateliensuccession: { type: "date", notNull: true },
    transfertsiege: { type: "boolean", notNull: true },
    continuiteeconomique: { type: "boolean", notNull: true },
    datederniertraitementliensuccession: { type: "timestamp", notNull: true }
  });
  pgm.createIndex(tablename, "siretetablissementpredecesseur");
  pgm.createIndex(tablename, "siretetablissementsuccesseur");
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
