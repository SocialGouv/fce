require("dotenv").config();
const process = require("process");
const fs = require("fs");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");
const _get = require("lodash.get");
const lineReplace = require("line-replace");

const TMP_DIR = "/tmp";
const PSQL_BASE_CMD = `psql -h ${process.env.PG_HOST} -d ${process.env.PG_DB} -U ${process.env.PG_USER} -c `;

class Ingestor {
  constructor(config) {
    this._config = config;
    this.psql = PSQL_BASE_CMD;
    this.tmpFile = `${TMP_DIR}/${this.getConfig("table")}.csv`;
    this.PG = require("../lib/postgres");
  }

  getConfig(key) {
    return _get(this._config, key);
  }

  async execute() {
    console.log("Execute Injestor");

    const { truncate, history } = this._config;

    await this._createTmpFileWithNewHeader();

    await this.beforeTruncate();
    if (truncate) {
      await this._truncateTable();
    }
    await this.afterTruncate();

    await this.beforePsqlCopy();
    await this._runPsqlCopy();
    await this.afterPsqlCopy();

    await this.beforeBuildHistory();
    if (history) {
      await this._buildHistory();
    }
    await this.afterBuildHistory();

    await this.beforeSaveProcessDate();
    await this._saveProcessDate();
    await this.afterSaveProcessDate();

    console.log("Injestor finished");
  }

  async beforeTruncate() {}
  async afterTruncate() {}
  async beforePsqlCopy() {}
  async afterPsqlCopy() {}
  async beforeBuildHistory() {}
  async afterBuildHistory() {}
  async beforeSaveProcessDate() {}
  async afterSaveProcessDate() {}

  async _createTmpFileWithNewHeader() {
    console.log("Create tmp file with new header");

    const { filename, delimiter, cols } = this._config;
    fs.copyFileSync(filename, this.tmpFile);

    return new Promise(resolve => {
      lineReplace({
        file: this.tmpFile,
        line: 1,
        text: cols.join(delimiter),
        addNewLine: true,
        callback: () => {
          resolve();
        }
      });
    });
  }

  _truncateTable() {
    console.log("Truncate table");
    return execSync(`${this.psql} "TRUNCATE ${this.getConfig("table")};"`);
  }

  _runPsqlCopy() {
    console.log("Import csv to postgres");
    const { table, delimiter, cols } = this._config;
    const psqlImportQuery = `${this.psql} "\\copy ${table}(${cols.join(
      ","
    )}) FROM '${
      this.tmpFile
    }' with (format csv, header true, delimiter '${delimiter}');"`;

    return execSync(psqlImportQuery);
  }

  _saveProcessDate() {
    console.log("save process date");
    const {
      date: { field, format },
      table
    } = this._config;

    const query = `UPDATE import_updates SET date = (SELECT max(TO_DATE(${field}, '${format}')) FROM ${table}), date_import = CURRENT_TIMESTAMP
    WHERE \\"table\\" = '${table}';`;

    return execSync(`${this.psql} "${query}"`);
  }

  async _buildHistory() {
    const History = require("./History");
    const history = new History({
      psql: this.psql,
      config: this._config,
      PG: this.PG,
      tmpFile: this.tmpFile
    });
    return await history.execute();
  }
}

module.exports = Ingestor;
