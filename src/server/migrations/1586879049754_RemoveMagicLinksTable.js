/* eslint-disable camelcase */
const tablename = "magic_links";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable(tablename);
};

exports.down = (pgm) => {
  pgm.createTable(tablename, {
    id: "id",
    email: { type: "varchar(255)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    validated_at: {
      type: "timestamp",
      notNull: false,
      default: null,
    },
    key: { type: "text", notNull: false },
  });
  pgm.createIndex(tablename, "email");
  pgm.createIndex(tablename, "key");
};
