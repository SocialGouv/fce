/* eslint-disable camelcase */

const tablename = "matomo_user_id"

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    user_id:  {type: "varchar(120)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  })
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
