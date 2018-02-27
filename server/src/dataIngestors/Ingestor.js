const XLSX = require("xlsx");

class Ingestor {
  constructor(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    this.workbook = workbook;
    if (sheetName) {
      this.workSheet = workbook.Sheets[sheetName];
    }
  }

  getData() {}

  save() {
    const data = this.getData();
    const promises = data.map(item => {
      const model = new this.Model(item);
      return model.save();
    });

    return Promise.all(promises);
  }
}

module.exports = Ingestor;
