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

    execSync(
      `${this.psql} "DELETE FROM ${table} as t1 using ${table} as t2 WHERE t1.siret = t2.siret AND t1.date_visite < t2.date_visite;"`
    );

    return execSync(
      `${this.psql} "UPDATE ${table} SET inspecteurs = replace(replace(inspecteurs,CHR(10),' '),CHR(13),' ');"`
    );
  }
}

module.exports = InteractionsPole3EIngestor;
