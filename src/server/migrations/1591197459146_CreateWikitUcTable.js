/* eslint-disable camelcase */
const tablename = "wikit_uc";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    code: { type: "varchar(6)", notNull: false },
    libelle: { type: "varchar(255)", notNull: false },
  });
  pgm.createIndex(tablename, "code");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
