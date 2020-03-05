/* eslint-disable camelcase */

exports.shorthands = undefined;

const indexesToDrop = [
  {
    table: "etablissements",
    col: "activiteprincipaleetablissement",
    name: "establishments_activiteprincipaleetablissement"
  },
  {
    table: "etablissements",
    col: "codecommuneetablissement",
    name: "establishments_codecommuneetablissement"
  },
  {
    table: "etablissements",
    col: "codepostaletablissement",
    name: "establishments_codepostaletablissement"
  },
  {
    table: "etablissements",
    col: "denominationusuelleetablissement",
    name: "establishments_denominationusuelleetablissement"
  },
  {
    table: "etablissements",
    col: "enseigne1etablissement",
    name: "establishments_enseigne1etablissement"
  },
  {
    table: "etablissements",
    col: "enseigne2etablissement",
    name: "establishments_enseigne2etablissement"
  },
  {
    table: "etablissements",
    col: "enseigne3etablissement",
    name: "establishments_enseigne3etablissement"
  },
  {
    table: "etablissements",
    col: "etablissementsiege",
    name: "establishments_etablissementsiege"
  },
  {
    table: "etablissements",
    col: "etatadministratifetablissement",
    name: "establishments_etatadministratifetablissement"
  },
  {
    table: "etablissements",
    col: "libellecommuneetablissement",
    name: "establishments_libellecommuneetablissement"
  },
  {
    table: "etablissements",
    col: "enseigne1etablissement_vector",
    name: "enseigne1etablissement_vector_idx"
  },
  { table: "etablissements", col: "search_vector", name: "search_vector_idx" },
  {
    table: "entreprises",
    col: "denominationunitelegale_vector",
    name: "denominationunitelegale_vector_idx"
  },
  {
    table: "entreprises",
    col: "activiteprincipaleunitelegale",
    name: "enterprises_activitePrincipaleUniteLegale"
  },
  {
    table: "entreprises",
    col: "denominationunitelegale",
    name: "enterprises_denominationUniteLegale"
  },
  {
    table: "entreprises",
    col: "denominationusuelle1unitelegale",
    name: "enterprises_denominationUsuelle1UniteLegale"
  },
  {
    table: "entreprises",
    col: "denominationusuelle2unitelegale",
    name: "enterprises_denominationUsuelle2UniteLegale"
  },
  {
    table: "entreprises",
    col: "denominationusuelle3unitelegale",
    name: "enterprises_denominationUsuelle3UniteLegale"
  },
  {
    table: "entreprises",
    col: "nomunitelegale",
    name: "enterprises_nomUniteLegale"
  },
  {
    table: "entreprises",
    col: "nomusageunitelegale",
    name: "enterprises_nomUsageUniteLegale"
  },
  {
    table: "entreprises",
    col: "pseudonymeunitelegale",
    name: "enterprises_pseudonymeUniteLegale"
  },
  { table: "entreprises", col: "name_vector", name: "name_vector_idx" },
  {
    table: "entreprises",
    col: "nomunitelegale_vector",
    name: "nomunitelegale_vector_idx"
  },
  {
    table: "entreprises",
    col: "nomusageunitelegale_vector",
    name: "nomusageunitelegale_vector_idx"
  }
];

exports.up = pgm => {
  indexesToDrop.forEach(({ table, col, name }) => {
    pgm.dropIndex(table, col, {
      name
    });
  });
};

exports.down = pgm => {};
