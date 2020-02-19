/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.renameTable("interactions_pole_3t", "interactions_pole_t");
};

exports.down = pgm => {
  pgm.renameTable("interactions_pole_t", "interactions_pole_3t");
};
