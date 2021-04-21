/* eslint-disable no-useless-escape */

const PsiIngestor = require("./PsiIngestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class PsiLastYearIngestor extends PsiIngestor {
  async beforePsqlCopy() {
    console.log("Create temporary table import_csv_tmp");
    const { cols } = this._config;
    const createTmpTableQuery = `${this.psql} "DROP TABLE IF EXISTS import_csv_tmp; CREATE TABLE import_csv_tmp(${cols[0]} VARCHAR, ${cols[1]} INT);"`;

    return execSync(createTmpTableQuery);
  }

  async _runPsqlCopy() {
    console.log("Import CSV to import_csv_tmp");
    const { delimiter, cols } = this._config;
    const columns = cols.join(",");

    const psqlImportQuery = `${this.psql} "\\copy import_csv_tmp(${columns}) FROM '${this.tmpFile}' \
      WITH (format csv, header true, delimiter '${delimiter}');"`;

    return execSync(psqlImportQuery);
  }

  async afterPsqlCopy() {
    console.log("Import last year data from import_csv_tmp");
    const { table, cols } = this._config;
    const columns = cols.join(",");
    const constraintIndex = `${table}${table.slice(3)}_key`;

    /**
     * - UNIQUE constraint on index "psi_siren_siren_key" or "psi_siret_siret_key"
     * - "excluded" table (excluded.salaries_annee_precedente) allows to access values from rows in conflict
     */
    const psqlLastYearImportQuery = `${this.psql} "INSERT INTO ${table}(${columns}) \
      SELECT ${columns} \
      FROM import_csv_tmp \
      ON CONFLICT ON CONSTRAINT ${constraintIndex} \
      DO UPDATE SET salaries_annee_precedente = excluded.salaries_annee_precedente; \
      DELETE FROM ${table} WHERE ${cols[0]}=''; \
      UPDATE ${table} SET salaries_annee_courante=0 WHERE salaries_annee_courante IS NULL; \
      UPDATE ${table} SET salaries_annee_precedente=0 WHERE salaries_annee_precedente IS NULL; \
      DROP TABLE import_csv_tmp;
      "`;

    return execSync(psqlLastYearImportQuery);
  }
}

module.exports = PsiLastYearIngestor;
