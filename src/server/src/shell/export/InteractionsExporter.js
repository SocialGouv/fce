const Exporter = require("./Exporter");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class InteractionsExporter extends Exporter {
  _runDbExport() {
    const { filename } = this._config;

    console.log(`Exporting interactions tables to CSV`);

    const psqlExportQuery = `
    ${this.psql} "\\copy (SELECT i.siret FROM (
        SELECT siret FROM "interactions_pole_c"
        UNION SELECT siret FROM "interactions_pole_t"
        UNION SELECT siret FROM "interactions_pole_3e"
        UNION SELECT siret FROM "interactions_pole_3e_src"
      ) AS i) TO ${this.LOCAL_STORAGE_PATH}/${this.exportDate}_${filename} DELIMITER ';' CSV HEADER"`;
    return execSync(psqlExportQuery);
  }
}

module.exports = InteractionsExporter;
