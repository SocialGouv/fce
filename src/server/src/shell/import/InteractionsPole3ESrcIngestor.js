const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class InteractionsPole3ESrcIngestor extends Ingestor {
  /**
   * Set SIRET siege if it's a SIREN
   */
  async afterPsqlCopy() {
    this._replaceSIRENBySIRET(this.getConfig("table"));
    this._fixDateFormat(this.getConfig("table"));
  }

  _replaceSIRENBySIRET(table) {
    console.log("Replace SIREN By SIRET");
    return execSync(
      `${this.psql} "UPDATE ${table}
      SET siret =
        CASE
          WHEN numero_etablissement IS NOT NULL
          THEN concat(siret, numero_etablissement)
          ELSE concat(siret, (SELECT nicsiegeunitelegale FROM entreprises WHERE siren = siret LIMIT 1))
        END;
      "`
    );
  }

  _fixDateFormat(table) {
    console.log("Fix date format");
    return execSync(
      `${this.psql} "UPDATE ${table} SET "date" = LEFT("date", 10);"`
    );
  }
}

module.exports = InteractionsPole3ESrcIngestor;
