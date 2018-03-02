const Ingestor = require("../Ingestor");
const WorksheetHelper = require("../../helpers/WorksheetHelper");
const Interaction = require("../../models/InteractionModel");

class InteractionsIngestor extends Ingestor {
  constructor(filePath, sheetName, pole) {
    super(filePath, sheetName);
    this.pole = pole;
    this.Model = Interaction;
  }

  getData() {
    const wsh = new WorksheetHelper(this.workSheet);

    let rowsData = wsh.getRowsData(this.columnsToKeep);
    rowsData = rowsData.map(row => {
      row.pole = this.pole;
      return row;
    });
    return rowsData;
  }

  getInteractions() {
    return this.getData();
  }

  reset() {
    const params = {
      removeParams: {
        pole: this.pole
      }
    };
    return super.reset(params);
  }
}

module.exports = InteractionsIngestor;
