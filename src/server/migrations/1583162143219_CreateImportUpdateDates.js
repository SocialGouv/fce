/* eslint-disable camelcase */
const tablename = "import_updates";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    fournisseur: { type: "varchar(50)", notNull: true },
    si: { type: "varchar(50)", notNull: true },
    table: { type: "varchar(50)", notNull: true },
    date_import: { type: "datetime", notNull: false, default: null },
    date: { type: "datetime", notNull: false, default: null }
  });
  pgm.createIndex(tablename, "table");
  pgm.createIndex(tablename, "si");
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
