const xlsx = require("xlsx");

module.exports = async filename => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const workBook = xlsx.readFile(filename);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return xlsx.writeFile(workBook, filename, { bookType: "csv" });
};
