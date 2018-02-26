const XLSX = require("xlsx");

class Ingestor{
  constructor(filePath, sheetName){
    const workbook = XLSX.readFile(filePath);
    this.workSheet = workbook.Sheets[sheetName];
  }

  save(){
  }
}

module.exports = Ingestor;
