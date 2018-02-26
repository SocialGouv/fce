const WorkSheetHelper = require("./WorkSheetHelper");

class WorkbookHelper {
  constructor(workbook) {
    this.workbook = workbook;
    // console.log(workbook);
  }

  getSheetsData(sheetsParams) {
    let sheetsData = {};
    this.workbook.SheetNames.map(sheetName => {
      const workSheet = this.workbook.Sheets[sheetName];
      const wsh = new WorkSheetHelper(workSheet);

      let columnToKeep = null;
      if(sheetsParams && sheetsParams[sheetName]){
        columnToKeep = sheetsParams[sheetName].columnsToKeep;
      }

      sheetsData[sheetName] = wsh.getRowsData(columnToKeep);
    });
    return sheetsData;
  }
}

module.exports = WorkbookHelper;
