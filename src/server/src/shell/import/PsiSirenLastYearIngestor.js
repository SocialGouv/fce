/* eslint-disable no-useless-escape */

const PsiIngestor = require("./PsiIngestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class PsiSirenLastYearIngestor extends PsiIngestor {
  _runPsqlCopy() {
    console.log("Import csv to postgres - upsert");
    const { table, delimiter, cols } = this._config;
    const columns = cols.join(",");

    // UNIQUE constraint on index "psi_siren_siren_key"
    // excluded table (excluded.salaries_annee_precedente) allows to access values from rows in conflict
    // import_csv is a temporary table droped once session is closed
    const psqlImportQuery = `${this.psql} "\
      CREATE TEMP TABLE import_csv(${cols[0]} VARCHAR, ${cols[1]} INT); \

      \copy import_csv(${columns}) FROM '${this.tmpFile}' WITH (format csv, header true, delimiter '${delimiter}'); \

      INSERT INTO ${table}(${columns}) \
      SELECT ${columns} \
      FROM import_csv \
      ON CONFLICT ON CONSTRAINT psi_siren_siren_key DO UPDATE SET salaries_annee_precedente = excluded.salaries_annee_precedente;"`;

    return execSync(psqlImportQuery);
  }
}

module.exports = PsiSirenLastYearIngestor;
