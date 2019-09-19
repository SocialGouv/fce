const config = require("config");
const IndexerUtils = require("./IndexerUtils");

let query = `SELECT etab.*, ${config.elasticIndexer.enterpriseFields.map(
  column_name => `ent.${column_name} as entreprise_${column_name}`
)}, naf.libelle as activiteprincipaleetablissement_libelle
        FROM etablissements etab
        INNER JOIN entreprises ent ON etab.siren = ent.siren
        LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement`;

new IndexerUtils(query, "index");
