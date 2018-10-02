const WorksheetHelper = require("./WorksheetHelper");

class WorkbookHelper {
  constructor(workbook) {
    this.workbook = workbook;
  }

  getSheetsData(sheetsParams) {
    let sheetsData = {};
    this.workbook.SheetNames.map(sheetName => {
      const workSheet = this.workbook.Sheets[sheetName];
      const wsh = new WorksheetHelper(workSheet);

      let columnToKeep = null;
      if (sheetsParams && sheetsParams[sheetName]) {
        columnToKeep = sheetsParams[sheetName].columnsToKeep;
      }

      sheetsData[sheetName] = wsh.getRowsData(columnToKeep);
    });
    return sheetsData;
  }
}

module.exports = WorkbookHelper;
