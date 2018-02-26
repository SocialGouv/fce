const XLSX = require("xlsx");

class Ingestor{
  constructor(filePath, sheetName){
    const workbook = XLSX.readFile(filePath);
    this.workbook = workbook;
    if(sheetName){
      this.workSheet = workbook.Sheets[sheetName];
    }
  }

  save(){
  }
}

module.exports = Ingestor;
