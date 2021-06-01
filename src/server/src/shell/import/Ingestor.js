require("dotenv").config();
const process = require("process");
const fs = require("fs");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");
const _get = require("lodash.get");
const lineReplace = require("line-replace");
const replaceStream = require("replacestream");
const { decode } = require("html-entities");

const TMP_DIR = "/tmp";
const PSQL_BASE_CMD = `psql -h ${process.env.PG_HOST} -d ${process.env.PG_DB} -U ${process.env.PG_USER} -c `;

class Ingestor {
  constructor(config, args) {
    this._config = config;
    this.args = args;
    this.psql = PSQL_BASE_CMD;
    this.tmpFile = `${TMP_DIR}/${this.getConfig("table")}.csv`;
    this.PG = require("../lib/postgres");
  }

  getConfig(key) {
    return _get(this._config, key);
  }

  async _replaceHtmlChars() {
    const tempFile = `${TMP_DIR}/sanitizes-${this.getConfig("table")}.csv`;
    const htmlEntitiesRegex = /&(?:[a-z]+|#x?\d+);/gi
    await new Promise(resolve => fs.createReadStream(this.tmpFile)
      .pipe(replaceStream(htmlEntitiesRegex, (entity) => decode(entity)))
      .pipe(fs.createWriteStream(tempFile))
      .on("finish", () => resolve()));

    await fs.promises.unlink(this.tmpFile);

    await fs.promises.rename(tempFile, this.tmpFile);
  }

  async execute() {
    console.log("Execute Injestor");

    const { truncate, history, generateSiren, replaceHtmlChars, doNotSaveDate } = this._config;

    await this._createTmpFileWithNewHeader();

    if (replaceHtmlChars) {
      await this._replaceHtmlChars();
    }

    await this.beforeTruncate();
    if (truncate) {
      await this._truncateTable();
    }
    await this.afterTruncate();

    await this.beforePsqlCopy();
    await this._runPsqlCopy();
    if (generateSiren) {
      await this._generateSiren();
    }
    await this.afterPsqlCopy();

    await this.beforeBuildHistory();
    if (history) {
      await this._buildHistory();
    }
    await this.afterBuildHistory();

    await this.beforeSaveProcessDate();
    if (!doNotSaveDate) {
      await this._saveProcessDate();
    }
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

    return new Promise((resolve) => {
      lineReplace({
        file: this.tmpFile,
        line: 1,
        text: cols.join(delimiter),
        addNewLine: true,
        callback: () => {
          resolve();
        },
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

  _generateSiren() {
    console.log("Generate SIREN");
    return execSync(
      `${this.psql} "UPDATE ${this.getConfig(
        "table"
      )} SET siren = LEFT(siret, 9);"`
    );
  }

  _saveProcessDate() {
    console.log("save process date");
    const {
      date: { field, format },
      table,
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
      tmpFile: this.tmpFile,
    });
    return await history.execute();
  }
}

module.exports = Ingestor;
