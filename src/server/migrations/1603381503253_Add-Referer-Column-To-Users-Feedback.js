/* eslint-disable camelcase */

const tablename = "users_feedback";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn(
    tablename,
    {
      referer: {
        default: null,
        type: "character(255)",
        notNull: false,
      },
    },
    { ifNotExists: true }
  );
};

exports.down = (pgm) => {
  pgm.dropColumn(tablename, "referer", { ifExists: true });
};
