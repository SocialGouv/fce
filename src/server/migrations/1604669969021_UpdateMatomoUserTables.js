/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable("user_logins");
  pgm.createTable("matomo_user_id", {
    user_id: { type: "varchar(120)", notNull: true, unique: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("matomo_user_id");
  pgm.createTable("user_logins", {
    user_id: { type: "varchar(120)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};
