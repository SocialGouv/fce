const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class RupcoProceduresIngestor extends Ingestor {
  beforePsqlCopy() {
    // We deduplicate rows
    execSync(`awk '{if (!($0 in x)) {print $0; x[$0]=1} }' ${this.tmpFile} > ${this.tmpFile}-dedup`);
    execSync(`mv ${this.tmpFile}-dedup ${this.tmpFile}`);
  }

  /**
   * Truncate only entries from December 2019 (keep legacy SI)
   */
  _truncateTable() {
    console.log("Truncate table");
    return execSync(
      `${this.psql} "DELETE FROM ${this.getConfig(
        "table"
      )} WHERE historique_si = FALSE OR date_enregistrement IS NULL;"`
    );
  }

  async afterPsqlCopy() {
    this._fixSirenLength(this.getConfig("table"));
    this._fixDateFormat(this.getConfig("table"));
  }

  _fixSirenLength(table) {
    console.log("fixSirenLength");
    return execSync(
      `${this.psql} "UPDATE ${table} SET "siren" = LPAD("siren", 9, '0');"`
    );
  }

  _fixDateFormat(table) {
    console.log("fixDateFormat");
    return execSync(
      `${this.psql} "UPDATE ${table} SET "date_enregistrement" = LEFT("date_enregistrement", 10);"`
    );
  }
}

module.exports = RupcoProceduresIngestor;
