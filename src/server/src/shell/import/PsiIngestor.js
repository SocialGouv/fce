const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");
const { readFile } = require("fs").promises;

const LOCAL_STORAGE_PATH = "/mnt/data/export";
class PsiIngestor extends Ingestor {
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
}

module.exports = PsiIngestor;
