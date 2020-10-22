require("dotenv").config();
const process = require("process");
const format = require("date-fns/format");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");
const _get = require("lodash.get");

const PSQL_BASE_CMD = `psql -h ${process.env.PG_HOST} -d ${process.env.PG_DB} -U ${process.env.PG_USER} -c `;

class Exporter {
  constructor(config) {
    this._config = config;
    this.psql = PSQL_BASE_CMD;
    this.PG = require("../lib/postgres");
    this.exportDate = format(new Date(), "yyyy-MM-dd_HH-mm");
    this.LOCAL_STORAGE_PATH = "/tmp/data";
  }

  getConfig(key) {
    return _get(this._config, key);
  }

  async execute() {
    console.log("Execute Exporter");

    await this.beforeDbExport();
    await this._runDbExport();
    await this.afterDbExport();

    console.log("Exporter finished");
  }

  async beforeDbExport() {}
  async afterDbExport() {}

  _runDbExport() {
    const { table, filename } = this._config;

    console.log(`Exporting ${table} table to CSV`);
    const psqlExportQuery = `${this.psql} "\\copy (SELECT * FROM ${table}) TO ${this.LOCAL_STORAGE_PATH}/${this.exportDate}_${filename} DELIMITER ';' CSV HEADER"`;

    return execSync(psqlExportQuery);
  }
}

module.exports = Exporter;
