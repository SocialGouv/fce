const xlsx = require("xlsx");

module.exports = async filename => {
  const workBook = xlsx.readFile(filename);
  return xlsx.writeFile(workBook, filename, { bookType: "csv" });
};
