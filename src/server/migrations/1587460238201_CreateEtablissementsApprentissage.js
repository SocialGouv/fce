/* eslint-disable camelcase */
const tablename = "etablissements_apprentissage";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(tablename, {
    siret: { type: "varchar(20)", notNull: false },
    type_contrat: { type: "integer", notNull: false },
    numero_enregistrement: { type: "varchar(50)", notNull: false },
    date_debut: { type: "varchar(30)", notNull: false },
    date_rupture: { type: "varchar(30)", notNull: false },
    empty: { type: "varchar(10)", notNull: false },
    empty2: { type: "varchar(10)", notNull: false },
  });
  pgm.createIndex(tablename, "siret");

  pgm.sql(
    `UPDATE import_updates SET "table" = 'etablissements_apprentissage' WHERE "fournisseur" = 'DGEFP' AND "si" = 'Ari@ne'`
  );
};

exports.down = (pgm) => {
  pgm.dropTable(tablename);

  pgm.sql(
    `UPDATE ${tablename} SET "table" = '' WHERE "fournisseur" = 'DGEFP' AND "si" = 'Ari@ne'`
  );
};
