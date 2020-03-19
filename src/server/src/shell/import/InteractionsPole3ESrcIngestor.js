const Ingestor = require("./Ingestor");
const { execSync } = require("child_process");

class InteractionsPole3ESrcIngestor extends Ingestor {
  /**
   * Set SIRET siege if it's a SIREN
   */
  async afterPsqlCopy() {
    console.log("Set SIRET siege if it's a SIREN");

    return execSync(
      `${this.psql} "UPDATE ${this.getConfig(
        "table"
      )} SET siret = concat(siret, (SELECT nicsiegeunitelegale FROM entreprises WHERE siren = siret LIMIT 1)) WHERE length(siret) = 9;"`
    );
  }
}

module.exports = InteractionsPole3ESrcIngestor;
