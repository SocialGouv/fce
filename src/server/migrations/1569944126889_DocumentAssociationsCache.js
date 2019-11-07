/* eslint-disable camelcase */
const tablename = "document_associations_cache";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    siret: { type: "varchar(20)", notNull: true },
    value: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
  pgm.createIndex(tablename, "siret");
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
