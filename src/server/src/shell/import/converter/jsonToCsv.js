const fs = require("fs");
const { Parser } = require("json2csv");
const minify = require("jsonminify");

module.exports = async (filename, mapFieldsFunction = null) => {
  console.log(`Converting JSON to CSV`);
  const rawJson = JSON.parse(minify(fs.readFileSync(`${filename}`, "utf-8")));

  const cleanedJson = mapFieldsFunction
    ? rawJson.UC.map(mapFieldsFunction)
    : rawJson;

  const jsonToCsv = new Parser();
  const csvData = jsonToCsv.parse(cleanedJson);

  fs.writeFile(`${filename}`, csvData, (err) => {
    if (err) throw err;
    console.log(`${filename} was successfully created.`);
  });
};
