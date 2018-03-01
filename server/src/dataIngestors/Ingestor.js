const XLSX = require("xlsx");
const NotImplementedError = require("../errors/NotImplementedError");

class Ingestor {
  constructor(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    this.workbook = workbook;
    if (sheetName) {
      this.workSheet = workbook.Sheets[sheetName];
    }
  }

  getData() {
    throw new NotImplementedError(
      "You must implement getDate method in child."
    );
  }

  save() {
    const data = this.getData();
    const promises = data.map(item => {
      const model = new this.Model(item);
      return model.save();
    });

    return Promise.all(promises);
  }

  reset() {
    throw new NotImplementedError(
      "You must implement getDate method in child."
    );
  }
}

module.exports = Ingestor;
