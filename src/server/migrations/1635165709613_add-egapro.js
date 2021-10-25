/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("egapro_index", {
        siren: {
            type: "varchar(9)",
            notNull: true
        },
        annee: {
            type: "integer",
            notNull: true
        },
        index: "integer",
    });

    pgm.createIndex("egapro_index", ["siren", "annee"], { unique: true });
    pgm.createIndex("egapro_index", "siren");

    pgm.sql(`INSERT INTO import_updates (fournisseur, si, "table") VALUES
        ('Egapro', 'Egapro', 'egapro_index')`
    );
};

exports.down = pgm => {
    pgm.dropTable("egapro_index");
};
