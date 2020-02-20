/* eslint-disable camelcase */

exports.shorthands = undefined;

const columnsToDrop = [
  { table: "entreprises", name: "denominationunitelegale_vector" },
  { table: "entreprises", name: "nomunitelegale_vector" },
  { table: "entreprises", name: "nomusageunitelegale_vector" },
  { table: "entreprises", name: "name_vector" },
  { table: "etablissements", name: "enseigne1etablissement_vector" },
  { table: "etablissements", name: "search_vector" }
];

exports.up = pgm => {
  columnsToDrop.forEach(({ table, name }) => {
    pgm.dropColumns(table, name);
  });
};

exports.down = pgm => {};
