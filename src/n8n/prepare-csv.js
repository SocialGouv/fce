const parse = require("csv-parse");
const stringify = require("csv-stringify");
const fs = require("fs");
const path = require("path");


const parseAndRewrite = (fileName) =>
  new Promise(resolve => {
    fs.createReadStream(fileName)
      .pipe(parse({
        delimiter: ";",
        columns: (record) => record
      }))
      .pipe(
        stringify({
          header: true,
          delimiter: ",",
          columns: ["Civilité","Nom","Prénom","Structure","Courriel"]
        })
      )
      .pipe(fs.createWriteStream(
        path.join(path.dirname(fileName), `result-${path.basename(fileName)}`)
      ))
      .on("data", (data) => {
        console.log("data", data);
      })
      .on("error", (err) => {
        console.log(err);
      })
      //
      //
      // .on("close", () => resolve);
  })

const main = () => {
  const folderPath = "/Users/clementberthou/Downloads";

  const files = fs.readdirSync(folderPath);

  const validFiles = files.filter((file) => /^DDETS.*\.csv/.test(file))
    .map(file => path.join(folderPath, file));

  return Promise.all(validFiles.map(parseAndRewrite));
}

main();
