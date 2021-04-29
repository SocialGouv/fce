/* eslint-disable camelcase */

const tablename = "interactions_pole_3e_src";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.renameColumn(tablename, "cols", "clos");
};

exports.down = (pgm) => {
  pgm.renameColumn(tablename, "clos", "cols");
};
