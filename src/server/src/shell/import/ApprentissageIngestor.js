const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");
const format = require("date-fns/format");
const subMonths = require("date-fns/subMonths");
const lastDayOfMonth = require("date-fns/lastDayOfMonth");

class ApprentissageIngestor extends Ingestor {
  /**
   * fixes the date in the month preceding the reception of the file
   */
  _saveProcessDate() {
    console.log("save process date");
    const { table } = this._config;
    const date = lastDayOfMonth(subMonths(new Date(), 1));

    const query = `UPDATE import_updates SET date = '${format(
      date,
      "yyyy-MM-dd"
    )}', date_import = CURRENT_TIMESTAMP
    WHERE \\"table\\" = '${table}';`;

    return execSync(`${this.psql} "${query}"`);
  }
}

module.exports = ApprentissageIngestor;
