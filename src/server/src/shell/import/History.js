// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");
const _get = require("lodash.get");
const formatDate = require("./formatDate");

class History {
  constructor({ psql, config, PG, tmpFile }) {
    this._config = config;
    this.psql = psql;
    this.PG = PG;
    this.tmpFile = tmpFile;
  }

  async execute() {
    const start = await this._getStartDate();

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

    const date = _get(response, "rows[0].start");
    return date && formatDate(date);
  }

  _removeHistory(start) {
    console.log(`Remove history, start date = ${start}`);
    const {
      date: { field, format },
      historyTable
    } = this._config;

    const query = `DELETE FROM ${historyTable} WHERE TO_DATE(${field}, '${format}') >= '${start}'::date;`;

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

export default History;
