const InteractionsIngestor = require("./InteractionsIngestor");

class PoleCIngestor extends InteractionsIngestor {
  constructor(filePath, sheetName) {
    const pole = "C";
    super(filePath, sheetName, pole);
  }

  getInteractions() {
    const columnsToKeep = {
      A: "siret",
      B: "date",
      E: "unite"
    };
    const rowsData = super.getInteractions(columnsToKeep);
    return rowsData;
  }
}

module.exports = PoleCIngestor;
