const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");
const { readFile } = require("fs").promises;

const LOCAL_STORAGE_PATH = "/mnt/data/export";
class PsiIngestor extends Ingestor {
  async afterPsqlCopy() {
    this._removeLinesWithoutSiren();
    this._setNullColumnsToZero();
  }

  _saveProcessDate() {
    console.log("save process date");
    const { table } = this._config;

    readFile(`${LOCAL_STORAGE_PATH}/psi-last-update.txt`)
      .then((date) => {
        const query = `UPDATE import_updates SET date = '${date}', date_import = CURRENT_TIMESTAMP WHERE \\"table\\" = '${table}';`;

        return execSync(`${this.psql} "${query}"`);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  _removeLinesWithoutSiren() {
    console.log("_removeLinesWithoutSiren");
    const { table, cols } = this._config;
    return execSync(`${this.psql} "DELETE FROM ${table} WHERE ${cols[0]}='';"`);
  }

  _setNullColumnsToZero() {
    console.log("_setNullColumnsToZero");
    const { table } = this._config;
    return execSync(
      `${this.psql} "\
      UPDATE ${table} SET salaries_annee_courante=0 WHERE salaries_annee_courante IS NULL;\
      UPDATE ${table} SET salaries_annee_precedente=0 WHERE salaries_annee_precedente IS NULL;"`
    );
  }
}

module.exports = PsiIngestor;
