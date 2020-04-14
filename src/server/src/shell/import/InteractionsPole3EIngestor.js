const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class InteractionsPole3EIngestor extends Ingestor {
  /**
   * Remove duplicate content and breaklines for inspecteurs
   */
  async afterPsqlCopy() {
    console.log("Remove duplicate content and breaklines for inspecteurs");
    const table = this.getConfig("table");

    return execSync(
      `${this.psql} "UPDATE ${table} SET inspecteurs = replace(replace(inspecteurs,CHR(10),' '),CHR(13),' ');"`
    );
  }
}

module.exports = InteractionsPole3EIngestor;
