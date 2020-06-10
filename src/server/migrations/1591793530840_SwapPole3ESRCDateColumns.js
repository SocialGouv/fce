/* eslint-disable camelcase */

exports.shorthands = undefined;

const tablename = "interactions_pole_3e_src";

exports.up = (pgm) => {
  pgm.renameColumn(tablename, "date", "date_creation");
  pgm.renameColumn(tablename, "date_derniere_modification", "date");
};

exports.down = (pgm) => {
  pgm.renameColumn(tablename, "date_creation", "date");
  pgm.renameColumn(tablename, "date", "date_derniere_modification");
};
