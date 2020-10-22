/* eslint-disable camelcase */
const tablename = "auth_temporary";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    activated: { type: "boolean", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.sql(
    `ALTER TABLE ${tablename} ADD COLUMN id uuid DEFAULT uuid_generate_v4 () NOT NULL`
  );
  pgm.createIndex(tablename, "id");
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
