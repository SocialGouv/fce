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

  async afterPsqlCopy() {
    this._fixSirenAndSiretLength(this.getConfig("table"));
  }

  _fixSirenAndSiretLength(table) {
    console.log("fixSirenAndSiretLength");
    return execSync(
      `${this.psql} "UPDATE ${table} SET "siren" = LPAD("siren", 9, '0'), "siren_etablissement" = LPAD("siren_etablissement", 9, '0'), "siret" = LPAD("siret", 14, '0');"`
    );
  }
}

module.exports = RupcoEtablissementsIngestor;
