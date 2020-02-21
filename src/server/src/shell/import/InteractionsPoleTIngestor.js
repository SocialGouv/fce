const { execSync } = require("child_process");
const nthline = require("nthline");
const Ingestor = require("./Ingestor");

class InteractionsPoleTIngestor extends Ingestor {
  async afterPsqlCopy() {
    const start = await this._getStartDate();

    if (!start) {
      throw new Error("Start date is undefined");
    }

    this._removeHistory(start);
    this._copyNewHistory();
  }

  async _getStartDate() {
    const firstLine = await nthline(1, this.tmpFile);
    const dateFr = firstLine.split(this.getConfig("delimiter"))[1];
    return this._formatDate(dateFr);
  }

  _removeHistory(start) {
    console.log("Revome history");

    const query = `DELETE FROM ${this.getConfig(
      "historyTable"
    )} WHERE TO_DATE(date, 'DD/MM/YYYY') >= '${start}'::date;`;

    return execSync(`${this.psql} "${query}"`);
  }

  _copyNewHistory() {
    console.log("Copy new history");

    const { historyTable, delimiter, cols } = this._config;
    const query = `${this.psql} "\\copy ${historyTable}(${cols.join(
      ","
    )}) FROM '${
      this.tmpFile
    }' with (format csv, header true, delimiter '${delimiter}');"`;

    return execSync(query);
  }
}

module.exports = InteractionsPoleTIngestor;
