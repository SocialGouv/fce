/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("valid_email", {
    email: {
      type: "TEXT",
      notNull: true,
      unique: true
    }
  })
};

exports.down = pgm => {
  pgm.dropTable("valid_email", {
    ifExists: true
  })
};
