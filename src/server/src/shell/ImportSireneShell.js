const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const unzipper = require("unzipper");
const Shell = require("./Shell");
const PG = require("../db/postgres");

const allowedExtension = ".csv";
const tables = {
  enterprises: "entreprises",
  establishments: "etablissements"
};
const delimiter = ",";

class ImportSireneShell extends Shell {
  async execute() {
    this.checkRequiredOption("enterprises_filename");
    this.checkRequiredOption("establishments_filename");

    const {
      enterprises_filename: enterprisesFilename,
      establishments_filename: establishmentsFilename
    } = this._options;

    const processes = [
      {
        name: "Enterprises",
        filename: enterprisesFilename,
        table: tables.enterprises
      },
      {
        name: "Establishments",
        filename: establishmentsFilename,
        table: tables.establishments
      }
    ];

    try {
      for (const { name, filename, table } of processes) {
        console.log(`Start Import ${name}`);

        const { stdout, stderr } = await this.importFile(filename, table);

        console.log(stdout);

        if (stderr) {
          console.error(stderr);
        }
      }

      this.reindex();
    } catch (err) {
      console.error("FAILED !");
      console.error(err);
    }
  }

  async importFile(filename, tableName) {
    if (!fs.existsSync(filename)) {
      throw new Error(`File "${filename}" not found`);
    }

    const fileExtension = path.extname(filename);

    filename = fileExtension === ".zip" ? await this.unzip(filename) : filename;

    const finalExtension = path.extname(filename);

    if (!filename || finalExtension !== allowedExtension) {
      throw new Error(
        `Extension "${finalExtension}" is not allowed for "${filename}"`
      );
    }

    if (!fs.existsSync(filename)) {
      throw new Error(`File "${filename}" not found`);
    }

    if (!(await this.truncateTable(tableName))) {
      throw new Error(`Truncate table "${tableName}" failed`);
    }

    return this.ingestCsv(filename);
  }

  async unzip(filename) {
    const directory = await unzipper.Open.file(filename);

    if (!directory.files || !directory.files.length) {
      return null;
    }

    const fileToUnzip = directory.files[0];
    const unzipedFilename = `/tmp/${fileToUnzip.path}`;

    return new Promise((resolve, reject) => {
      fileToUnzip
        .stream()
        .pipe(fs.createWriteStream(unzipedFilename))
        .on("error", reject)
        .on("finish", () => resolve(unzipedFilename));
    });
  }

  async truncateTable(table) {
    return PG.query(`TRUNCATE TABLE ${table}`);
  }

  async ingestCsv(filename) {
    const { PG_HOST, PG_USER, PG_DB } = this._config.env;

    const { stdout: header } = await exec(`head -c -1 -n 1 ${filename}`);
    const columns = header.replace("\n", "").split(delimiter);

    const importCsvCmd = `psql -h ${PG_HOST} -d ${PG_DB} -U ${PG_USER} -c "\\copy ${
      tables.enterprises
    }(${columns.join(
      ","
    )}) FROM '${filename}' with (format csv, header true, delimiter '${delimiter}');"`;

    return exec(importCsvCmd);
  }

  async reindex() {
    console.log("TODO : run reindex");
  }
}

module.exports = ImportSireneShell;
