/* eslint-disable camelcase */
const tablename = "users_feedback";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn(
    tablename,
    {
      rate: {
        default: "",
        type: "character(2)",
        notNull: true,
      },
    },
    { ifNotExists: true }
  );
};

exports.down = (pgm) => {
  pgm.dropColumn(tablename, "rate", { ifExists: true });
};
