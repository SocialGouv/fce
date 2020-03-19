/* eslint-disable camelcase */
const tablename = "import_updates";

exports.shorthands = undefined;

/**
 * Sources en attente :
 * - "DGCCRF / SORA"
 * - "DGEFP / Ari@ne"
 * - "DGEFP / Mes Démarches Formation"
 * - "DGEFP / Extrapro"
 */
const sources = [
  {
    fournisseur: "DGT",
    si: "D@cccord",
    table: "etablissements_accords",
    date: "2019-11-04"
  },
  {
    fournisseur: "DGT",
    si: "Wiki''T",
    table: "interactions_pole_t",
    date: "2020-02-19"
  },
  {
    fournisseur: "DGE",
    si: "EOS",
    table: "interactions_pole_3e",
    date: "2020-02-28"
  },
  {
    fournisseur: "DGCCRF",
    si: "SORA",
    // TODO - table doesn't exists
    table: "interactions_pole_c"
  },
  {
    fournisseur: "DARES",
    si: "DSN",
    table: "etablissements_dsn_eff",
    date: "2019-10-01"
  },
  {
    fournisseur: "Insee",
    si: "Sirène",
    table: "etablissements",
    date: "2020-02-01"
  },
  {
    fournisseur: "DGEFP",
    si: "APART",
    table: "etablissements_activite_partielle",
    date: "2019-09-17"
  },
  {
    fournisseur: "DGEFP",
    si: "SI PSE/RUPCO",
    table: "etablissements_pse",
    date: "2020-02-04"
  },
  {
    fournisseur: "DGEFP",
    si: "Ari@ne",
    // TODO - table doesn't exists
    table: "tablename"
  },
  {
    fournisseur: "DGEFP",
    si: "Extrapro",
    // TODO - table ?
    table: "tablename"
  },
  {
    fournisseur: "DGEFP",
    si: "MDF", // MDF = Mes démarches formation
    // TODO
    table: "tablename",
    date: "2019-10-29"
  },
  {
    fournisseur: "DARES",
    si: "Siene",
    table: "etablissements_uc_eff",
    date: "2015-12-01"
  },
  {
    fournisseur: "DGEFP",
    si: "ASP Extranet CUI",
    table: "etablissements_contrats_aides",
    date: "2018-12-01"
  },
  {
    fournisseur: "DGEFP",
    si: "ASP Extranet IAE2.0",
    table: "etablissements_iae",
    date: "2018-12-01"
  }
];

exports.up = pgm => {
  for (const source of sources) {
    const { fournisseur, si, table, date } = source;
    const verifiedDate = date ? `'${date}'` : `NULL`;

    pgm.sql(
      `INSERT INTO ${tablename} ("fournisseur", "si", "table", "date") VALUES('${fournisseur}','${si}', '${table}', ${verifiedDate})`
    );
  }
};

exports.down = pgm => {
  pgm.sql(`TRUNCATE ${tablename}`);
};
