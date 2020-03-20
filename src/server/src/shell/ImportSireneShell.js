const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const unzipper = require("unzipper");
const Shell = require("./Shell");
const PG = require("../db/postgres");

const PRIMARY_INDEX = "primary";
const INDEX = "index";

const allowedExtension = ".csv";
const tables = {
  enterprises: "entreprises",
  establishments: "etablissements",
  establishmentsSuccessions: "etablissements_successions"
};
const indexes = {
  entreprises: [
    { col: "siren", name: "entreprises_siren", type: PRIMARY_INDEX }
  ],
  etablissements: [
    { col: "siret", name: "etablissements_siret", type: PRIMARY_INDEX },
    { col: "siren", name: "etablissements_siren", type: INDEX }
  ]
};
const delimiter = ",";

class ImportSireneShell extends Shell {
  async execute() {
    this.checkRequiredOption("enterprises_filename");
    this.checkRequiredOption("establishments_filename");
    this.checkRequiredOption("establishments_successions_filename");

    const {
      enterprises_filename: enterprisesFilename,
      establishments_filename: establishmentsFilename,
      establishments_successions_filename: establishmentsSuccessionsFilename
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
      },
      {
        name: "EstablishmentsSuccessions",
        filename: establishmentsSuccessionsFilename,
        table: tables.establishmentsSuccessions
      }
    ];

    try {
      for (const { name, filename, table } of processes) {
        console.log(`Start Import ${name}`);

        const { stdout, stderr } = await this.importFile(filename, table);

        console.log(`import file ${filename} finished`);
        console.log(stdout);

        if (stderr) {
          console.error(stderr);
        }
      }
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

    if (!(await this.dropIndexes(tableName))) {
      console.error(`Drop indexes for table "${tableName}" failed`);
    }

    const ingestResponse = this.ingestCsv(filename, tableName);

    if (!(await this.createIndexes(tableName))) {
      throw new Error(`Create indexes for table "${tableName}" failed`);
    }

    return ingestResponse;
  }

  async unzip(filename) {
    console.log(`unzip ${filename}`);

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
        .on("finish", () => {
          console.log(`file ${filename} unziped to ${unzipedFilename}`);
          resolve(unzipedFilename);
        });
    });
  }

  async truncateTable(table) {
    console.log(`start truncate table ${table}`);
    return PG.query(`TRUNCATE TABLE ${table}`);
  }

  async dropIndexes(table) {
    console.log(`start drop indexes for table ${table}`);

    if (!indexes[table]) {
      return true;
    }

    for (const { name, type } of indexes[table]) {
      if (type === PRIMARY_INDEX) {
        console.log(`start DROP primary index ${name}`);
        if (!(await PG.query(`ALTER TABLE ${table} DROP CONSTRAINT ${name}`))) {
          return false;
        }
      } else {
        console.log(`start DROP index ${name}`);
        if (!(await PG.query(`DROP INDEX ${name}`))) {
          return false;
        }
      }
    }

    return true;
  }

  async createIndexes(table) {
    console.log(`start create indexes for table ${table}`);

    if (!indexes[table]) {
      return true;
    }

    for (const { name, col, type } of indexes[table]) {
      if (type === PRIMARY_INDEX) {
        console.log(`start CREATE primary index ${name}`);

        if (
          !(await PG.query(
            `ALTER TABLE ${table} ADD CONSTRAINT ${name} PRIMARY KEY (${col})`
          ))
        ) {
          return false;
        }
      } else {
        console.log(`start CREATE index ${name}`);
        if (
          !(await PG.query(
            `CREATE INDEX ${name} ON ${table} USING btree (${col})`
          ))
        ) {
          return false;
        }
      }
    }

    return true;
  }

  async ingestCsv(filename, tableName) {
    console.log(`start ingestCsv ${filename} to ${tableName}`);

    const { PG_HOST, PG_USER, PG_DB } = this._config.env;

    const { stdout: header } = await exec(`head -n 1 ${filename}`);
    const columns = header.replace("\n", "").split(delimiter);

    const importCsvCmd = `psql -h ${PG_HOST} -d ${PG_DB} -U ${PG_USER} -c "\\copy ${tableName}(${columns.join(
      ","
    )}) FROM '${filename}' with (format csv, header true, delimiter '${delimiter}');"`;

    console.log(`start command ${importCsvCmd}`);

    return exec(importCsvCmd);
  }
}

export default ImportSireneShell;
