const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class RupcoProceduresIngestor extends Ingestor {
  /**
   * Truncate only entries from December 2019 (keep legacy SI)
   */
  _truncateTable() {
    console.log("Truncate table");
    return execSync(
      `${this.psql} "DELETE FROM ${this.getConfig(
        "table"
      )} WHERE date_enregistrement NOT LIKE '%/%' OR date_enregistrement IS NULL;"`
    );
  }

  async afterPsqlCopy() {
    this._fixSirenLength(this.getConfig("table"));
  }

  _fixSirenLength(table) {
    console.log("fixSirenLength");
    return execSync(
      `${this.psql} "UPDATE ${table} SET "siren" = LPAD("siren", 9, '0');"`
    );
  }
}

module.exports = RupcoProceduresIngestor;
