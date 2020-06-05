const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class InteractionsPole3TIngestor extends Ingestor {
  /**
   * Replace Wikit Control Units labels
   */
  async afterPsqlCopy() {
    this._replaceRealisePourCodeByLabel(this.getConfig("table"));
  }

  _replaceRealisePourCodeByLabel(table) {
    console.log(`Replace Wikit Control Units labels for ${table}`);

    const query = `
      UPDATE "${table}"
      SET intervenant =
        CASE
          WHEN EXISTS (SELECT email FROM wikit_uc WHERE code = realise_pour)
          THEN (SELECT email FROM wikit_uc WHERE code = realise_pour)
          ELSE intervenant
        END,
      realise_pour =
        CASE
          WHEN EXISTS (SELECT libelle FROM wikit_uc WHERE code = realise_pour)
          THEN (SELECT libelle FROM wikit_uc WHERE code = realise_pour)
          ELSE realise_pour
        END;`;

    return execSync(`${this.psql} "${query}"`);
  }
}

module.exports = InteractionsPole3TIngestor;
