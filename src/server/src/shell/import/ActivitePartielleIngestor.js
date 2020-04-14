const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class ActivitePartielleIngestor extends Ingestor {
  async afterPsqlCopy() {
    this._cleanNonSiretLines(this.getConfig("table"));
    this._convertDates(this.getConfig("table"));
  }

  async afterBuildHistory() {
    this._cleanNonSiretLines(this.getConfig("historyTable"));
    this._convertDates(this.getConfig("historyTable"));
  }

  _cleanNonSiretLines(table) {
    console.log(`cleanNonSiretLines for ${table}`);

    return execSync(`${this.psql} "DELETE FROM ${table} WHERE siret IS NULL;"`);
  }

  _convertDates(table) {
    console.log(`Convert dates with a bad format ${table}`);

    return execSync(
      `${this.psql} "UPDATE ${table} SET date_decision = to_char(to_date(date_decision, 'MM/DD/YY'), 'YYYY-MM-DD') WHERE date_decision LIKE '%/%';"`
    );
  }
}

module.exports = ActivitePartielleIngestor;
