const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class WikitUcIngestor extends Ingestor {
  _saveProcessDate() {
    console.log("save process date");
    const { table } = this._config;

    const query = `UPDATE import_updates SET date_import = CURRENT_TIMESTAMP
    WHERE \\"table\\" = '${table}';`;

    return execSync(`${this.psql} "${query}"`);
  }
}

module.exports = WikitUcIngestor;
