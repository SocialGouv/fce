/* eslint-disable camelcase */
const tablename = "api_keys";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    activated: { type: "boolean", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    key: { type: "varchar(64)", notNull: true },
  }, {
    ifNotExists: true
  });
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
