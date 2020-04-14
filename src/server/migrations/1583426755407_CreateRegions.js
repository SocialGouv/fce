/* eslint-disable camelcase */
const tablename = "regions";

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(tablename, {
    code: { type: "varchar(2)", notNull: true },
    nom: { type: "varchar(255)", notNull: true }
  });
  pgm.createIndex(tablename, "code");

  [
    { code: "01", nom: "Guadeloupe" },
    { code: "02", nom: "Martinique" },
    { code: "03", nom: "Guyane" },
    { code: "04", nom: "La Réunion" },
    { code: "06", nom: "Mayotte" },
    { code: "11", nom: "Île-de-France" },
    { code: "24", nom: "Centre-Val de Loire" },
    { code: "27", nom: "Bourgogne-Franche-Comté" },
    { code: "28", nom: "Normandie" },
    { code: "32", nom: "Hauts-de-France" },
    { code: "44", nom: "Grand Est" },
    { code: "52", nom: "Pays de la Loire" },
    { code: "53", nom: "Bretagne" },
    { code: "75", nom: "Nouvelle-Aquitaine" },
    { code: "76", nom: "Occitanie" },
    { code: "84", nom: "Auvergne-Rhône-Alpes" },
    { code: "93", nom: "Provence-Alpes-Côte d''Azur" },
    { code: "94", nom: "Corse" }
  ].forEach(({ code, nom }) => {
    pgm.sql(
      `INSERT INTO ${tablename} (code, nom) VALUES ('${code}', '${nom}');`
    );
  });
};

exports.down = pgm => {
  pgm.dropTable(tablename);
};
