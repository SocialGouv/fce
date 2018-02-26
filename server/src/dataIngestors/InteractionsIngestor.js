const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");

class InteractionsIngestor extends Ingestor {
  constructor(filePath, sheetName, pole) {
    super(filePath, sheetName);
    this.pole = pole;
  }

  getInteractions(columnsToKeep) {
    const wsh = new WorksheetHelper(this.workSheet);

    let rowsData = wsh.getRowsData(columnsToKeep);
    rowsData = rowsData.map(row => {
      row.pole = this.pole;
      return row;
    });
    return rowsData;
  }

}

module.exports = InteractionsIngestor;
