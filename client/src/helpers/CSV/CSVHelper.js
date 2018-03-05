const json2csv = require("json2csv").parse;

const jsonToCSV = data => {
  if (!data) {
    return null;
  }
  const res = json2csv(data);
  return res;
};

module.exports = {
  jsonToCSV
};
