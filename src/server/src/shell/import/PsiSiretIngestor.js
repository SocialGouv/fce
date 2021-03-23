const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class PsiSiretIngestor extends Ingestor {
  constructor(config, args) {
    super(config, args);
    try {
      if (!args.year) {
        throw new Error(
          "You must specify a year for PSI imports.\nEx: yarn shell IngestFile --id psi_siret --year 2020"
        );
      }
      this.year = args.year;
    } catch (e) {
      console.error(`\n/!\\ ERROR : ${e.message}\n`);
    }
  }

  async afterPsqlCopy() {
    this._removeLinesWithoutSiren();
    this._addYear();
  }

  async _saveProcessDate() {}

  _removeLinesWithoutSiren() {
    console.log("_removeLinesWithoutSiren");
    return execSync(`${this.psql} "DELETE FROM psi_siret WHERE siret='';"`);
  }

  _addYear() {
    console.log("_addYear");
    return execSync(
      `${this.psql} "UPDATE psi_siret SET year=${this.year} WHERE year IS NULL;"`
    );
  }
}

module.exports = PsiSiretIngestor;
