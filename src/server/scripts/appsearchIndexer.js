const config = require("config");
const IndexerUtilsAppsearch = require("./IndexerUtilsAppsearch");

let query = `SELECT etab.*, ${config.elasticIndexer.enterpriseFields.map(
  (column_name) => `ent.${column_name} as entreprise_${column_name}`
)}, naf.libelle as activiteprincipaleetablissement_libelle,
    last_dsn_effectif.trancheeffectifsetablissement as lastdsntrancheeffectifsetablissement,
    last_dsn_effectif.effectif as lastdsneffectif
        FROM etablissements etab
        INNER JOIN entreprises ent ON etab.siren = ent.siren
        LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement
        LEFT JOIN last_dsn_effectif ON last_dsn_effectif.siret = etab.siret WHERE last_dsn_effectif.trancheeffectifsetablissement = 'SP' LIMIT 10
        `;

new IndexerUtilsAppsearch(query, "index");
