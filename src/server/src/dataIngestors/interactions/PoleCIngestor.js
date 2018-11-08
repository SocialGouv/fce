const InteractionsIngestor = require("./InteractionsIngestor");

class PoleCIngestor extends InteractionsIngestor {
  constructor(filePath, sheetName) {
    const pole = "C";
    super(filePath, sheetName, pole);
    const columnsToKeep = {
      A: "siret",
      B: "date",
      E: "unite"
    };
    this.columnsToKeep = columnsToKeep;
  }
}

module.exports = PoleCIngestor;
