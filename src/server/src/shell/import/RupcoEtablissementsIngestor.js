const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class RupcoEtablissementsIngestor extends Ingestor {
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
}

module.exports = RupcoEtablissementsIngestor;
