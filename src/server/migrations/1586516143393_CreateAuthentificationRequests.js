/* eslint-disable camelcase */
const tablename = "authentification_requests";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    id: "id",
    email: { type: "varchar(255)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    code: { type: "varchar(5)", notNull: false },
    failures: { type: "smallint", notNull: true, default: 0 },
  });
  pgm.createIndex(tablename, "email");
  pgm.createIndex(tablename, "code");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
