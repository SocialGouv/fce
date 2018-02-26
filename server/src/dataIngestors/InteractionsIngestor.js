const Ingestor = require("./Ingestor");
const WorkSheetHelper = require("../helpers/WorkSheetHelper");

class InteractionsIngestor extends Ingestor {
  constructor(filePath, sheetName, pole) {
    super(filePath, sheetName);
    this.pole = pole;
  }

  getInteractions(columnsToKeep) {
    const wsh = new WorkSheetHelper(this.workSheet);

    let rowsData = wsh.getRowsData(columnsToKeep);
    rowsData = rowsData.map(row => {
      row.pole = this.pole;
      return row;
    });
    return rowsData;
  }

}

module.exports = InteractionsIngestor;
