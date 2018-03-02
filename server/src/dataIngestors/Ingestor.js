const XLSX = require("xlsx");
const NotImplementedError = require("../errors/NotImplementedError");

class Ingestor {
  constructor(filePath, sheetName) {
    if (filePath) {
      const workbook = XLSX.readFile(filePath);
      this.workbook = workbook;
      if (sheetName) {
        this.workSheet = workbook.Sheets[sheetName];
      }
    }
  }

  getData() {
    throw new NotImplementedError(
      "You must implement getDate method in child."
    );
  }

  save(params) {
    const data = this.getData(params);
    const promises = data.map(item => {
      const model = new this.Model(item);
      return model.save();
    });

    return Promise.all(promises);
  }

  reset(params) {
    if (this.Model) {
      let p = params && params.removeParams || {};

      return this.Model.remove(p);
    } else {
      throw new NotImplementedError(
        "You must implement reset method in child or define a Model."
      );
    }
  }
}

module.exports = Ingestor;
