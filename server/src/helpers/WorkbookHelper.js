const WorkSheetHelper = require("./WorkSheetHelper");

class WorkbookHelper {
  constructor(workbook) {
    this.workbook = workbook;
    // console.log(workbook);
  }


  getSheetData(sheetsToKeep) {
    let sheetData = {};
    this.workbook.SheetNames.map( sheetName => {
      const workSheet = this.workbook.Sheets[sheetName];
      const wsh = new WorkSheetHelper(workSheet)
      sheetData[sheetName] = wsh.getRowsData();
    })
    return sheetData;
  }
}

module.exports = WorkbookHelper;
