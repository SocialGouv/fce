/* eslint-disable camelcase */
const tablename = "mailing_list";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    id: "id",
    email: { type: "varchar(255)", notNull: true, unique: true },
    hash: { type: "varchar(60)" },
    subscription_date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);
};
