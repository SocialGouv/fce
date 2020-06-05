const fs = require("fs");
const minify = require("jsonminify");
const { Parser } = require("json2csv");

module.exports = async (filename, transformer = null) => {
  console.log(`Converting JSON to CSV`);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const rawJson = JSON.parse(minify(fs.readFileSync(`${filename}`, "utf-8")));
  const formatedJson = transformer ? rawJson.UC.map(transformer) : rawJson;

  const jsonToCsv = new Parser();
  const csvData = jsonToCsv.parse(formatedJson);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFile(`${filename}`, csvData, (err) => {
    if (err) throw err;
    console.log(`${filename} was successfully created.`);
  });
};
