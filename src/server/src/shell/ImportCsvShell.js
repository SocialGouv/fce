require("dotenv").config();
const { execSync } = require("child_process");
const readline = require("readline");
const process = require("process");
const csv = require("csv-parser");
const fs = require("fs");
const Shell = require("./Shell");

const psqlBaseCmd = `psql -h ${process.env.PG_HOST} -d ${process.env.PG_DB} -U ${process.env.PG_USER} -c `;

const psqlQueriesAfterImport = {
  interactions_pole_3e: [
    "DELETE FROM interactions_pole_3e as t1 using interactions_pole_3e as t2 WHERE t1.siret = t2.siret AND t1.date_visite < t2.date_visite;",
    "UPDATE interactions_pole_3e SET inspecteurs = replace(replace(inspecteurs,CHR(10),' '),CHR(13),' ');"
  ]
};

class ImportCsvShell extends Shell {
  constructor(args, options) {
    super(args, options);
  }

  async execute() {
    let fileName = this._args[0];
    let pathName = process.cwd();
    const tmpFile = "/tmp/fce_import.csv";
    let completeFilePath = pathName + "/" + fileName;

    let delimiter = ",";
    let tableName = "";

    if (
      !fileName ||
      !fileName.includes(".csv") ||
      !fs.existsSync(completeFilePath)
    ) {
      console.error(
        "Error on file name or file doesn't exist",
        completeFilePath
      );
      return false;
    }

    let writeStream = fs.createWriteStream(tmpFile);
    let rlp = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });

    await new Promise((res, rej) => {
      rlp.question(
        `Le délimiteur par défaut est ${delimiter} souhaitez vous le remplacer ? (N/nouveau délimiteur) : `,
        answer => {
          if (answer.toUpperCase() !== "N" && answer !== "") {
            delimiter = answer;
          }

          console.log(`Le délimiteur est : ${delimiter}`);
          res();
        }
      );
    });

    await new Promise((res, rej) => {
      rlp.question(
        `Dans quelle table voulez vous importer le csv ? : `,
        answer => {
          tableName = answer;
          res();
        }
      );
    });

    let csvHeaders = [];
    const choseHeaderName = new Promise((resolve, reject) => {
      fs.createReadStream(completeFilePath)
        .pipe(csv({ separator: delimiter }))
        .on("headers", async headers => {
          for await (let header of headers) {
            await new Promise((res, rej) => {
              rlp.question(
                `Pour la colonne ${header} choisisez un nouveau nom de colonne : `,
                answer => {
                  console.log(
                    `Le nouveau nom de la collone ${header} est: ${answer}`
                  );
                  answer ? csvHeaders.push(answer) : csvHeaders.push(header);

                  res();
                }
              );
            });
          }

          rlp.close();
          resolve();
        });
    });

    choseHeaderName.then(() => {
      let stringCsvHeaders = csvHeaders.join(",");
      writeStream.write(csvHeaders.join(delimiter) + "\n");

      fs.createReadStream(completeFilePath)
        .on("data", rawData => {
          writeStream.write(rawData.toString());
        })
        .on("end", () => {
          console.log("-----------> Csv clean ! :)");
          console.log(`Truncate table ${tableName}`);
          const psqlTruncateQuery = `${psqlBaseCmd} "TRUNCATE ${tableName};"`;
          execSync(psqlTruncateQuery);

          console.log("Run import.");
          const psqlImportQuery = `${psqlBaseCmd} "\\copy ${tableName}(${stringCsvHeaders}) FROM '${tmpFile}' with (format csv, header true, delimiter '${delimiter}');"`;
          execSync(psqlImportQuery);

          if (psqlQueriesAfterImport[tableName]) {
            console.log("Execute postqueries.");
            psqlQueriesAfterImport[tableName].forEach(query => {
              execSync(`${psqlBaseCmd} "${query}"`);
            });
          }

          console.log("Remove tmp file");
          execSync(`rm ${tmpFile}`);
        });
    });
  }
}

module.exports = ImportCsvShell;
