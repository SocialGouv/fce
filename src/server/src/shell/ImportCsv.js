const { execSync } = require("child_process");
const readline = require("readline");
const process = require("process");
const csv = require("csv-parser");
const fs = require("fs");

let fileName = process.argv[2];
let pathName = process.cwd();
let completeFilePath = pathName + "/" + fileName;

let delimiter = ",";
let databaseName = "default";

if (
  fileName &&
  fileName.search(".csv") !== "-1" &&
  fs.existsSync(completeFilePath)
) {
  let writeStream = fs.createWriteStream("tmp.csv");
  let rlp = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });

  let csvHeaders = [];
  const choseHeaderName = new Promise((resolve, reject) => {
    fs.createReadStream(completeFilePath)
      .pipe(csv())
      .on("headers", async headers => {
        await new Promise((res, rej) => {
          rlp.question(
            `Le délimiteur par défaut est ${delimiter} shouaitez vous le remplacer ? (N/nouveau delimiteur) : `,
            answer => {
              if (answer === "N" || answer === "n") {
                console.log("Le delimiteur reste celui par défaut.");
              } else {
                console.log(`Le delimiteur est donc: ${answer}`);
                delimiter = answer;
              }
              res();
            }
          );
        });

        await new Promise((res, rej) => {
          rlp.question(
            `Dans quelle database voulez vous importer le csv ? : `,
            answer => {
              databaseName = answer;
              res();
            }
          );
        });

        for await (let header of headers) {
          await new Promise((res, rej) => {
            rlp.question(
              `Pour la colonne ${header} choisisez un nouveau nom de colonne : `,
              answer => {
                console.log(
                  `Le nouveau nom de la collone ${header} est: ${answer}`
                );
                csvHeaders.push(answer);
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
    let stringCsvHeaders = csvHeaders.join(delimiter);
    writeStream.write(csvHeaders.join(delimiter) + "\n");

    fs.createReadStream(completeFilePath)
      .pipe(csv())
      .on("data", rawData => {
        let raw = Object.values(rawData).join(delimiter);
        writeStream.write(raw + "\n");
      })
      .on("end", () => {
        console.log("-----------> Csv clean ! :)");
        console.log("Run import.");
        let psqlQuery = `psql -h ${process.env.PG_HOST} -d ${process.env.PG_DB} -U ${process.env.PG_USER} -p ${process.env.PG_PASSWORD}
        -c "\copy ${databaseName}(${stringCsvHeaders}) FROM '${completeFilePath}' 
        with (format csv, header true, delimiter '${delimiter}');"`;

        execSync(psqlQuery);
        execSync("rm tpm.csv");
      });
  });
} else {
  console.log("Error on file name or file doesn't exist");
}
