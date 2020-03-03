const { execSync } = require("child_process");
const _get = require("lodash.get");
const Ingestor = require("./Ingestor");

class InteractionsPole3EIngestor extends Ingestor {
  async afterPsqlCopy() {
    const start = await this._getStartDate();

    console.log({ start });

    if (!start) {
      throw new Error("Start date is undefined");
    }

    this._removeHistory(start);
    this._copyNewHistory();
  }

  async _getStartDate() {
    const {
      date: { field, format },
      table
    } = this._config;

    const response = await this.PG.query(
      `SELECT min(TO_DATE(${field}, '${format}')) as start FROM ${table}`
    );

    return _get(response, "rows[0].start");
  }

  _removeHistory(start) {
    console.log("Remove history");

    const query = `DELETE FROM ${this.getConfig(
      "historyTable"
    )} WHERE TO_DATE(date_visite, 'DD/MM/YYYY') >= '${start}'::date;`;

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

module.exports = InteractionsPole3EIngestor;
