const addMonths = require("date-fns/addMonths");
const format = require("date-fns/format");
const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class InteractionsPole3EIngestor extends Ingestor {
  /**
   * Remove duplicate content and breaklines for inspecteurs
   */
  async afterPsqlCopy() {
    this._removeBreaklinesForInspecteurs(this.getConfig("table"));
    this._removeFuturesInterventions(this.getConfig("table"));
  }

  _removeBreaklinesForInspecteurs(table) {
    console.log("Remove duplicate content and breaklines for inspecteurs");

    return execSync(
      `${this.psql} "UPDATE ${table} SET inspecteurs = replace(replace(inspecteurs,CHR(10),' '),CHR(13),' ');"`
    );
  }

  _removeFuturesInterventions(table) {
    console.log("Remove future interventions");

    const {
      date: { field, format: dateFormat },
    } = this._config;
    const now = new Date();
    const nextMonth = addMonths(now, 1);

    const query = `DELETE FROM ${table} WHERE TO_DATE(${field}, '${dateFormat}') >= '${format(
      nextMonth,
      "yyyy-MM-01"
    )}'::date;`;

    return execSync(`${this.psql} "${query}"`);
  }
}

module.exports = InteractionsPole3EIngestor;
