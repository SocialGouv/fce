const InteractionsIngestor = require("./InteractionsIngestor");

class Pole3EIngestor extends InteractionsIngestor {
  constructor(filePath, sheetName) {
    const pole = "3E";
    super(filePath, sheetName, pole);
  }

  getInteractions() {
    const columnsToKeep = {
      A: "siret",
      C: "date",
      D: "unite",
      E: "type_intervention"
    };
    const rowsData = super.getInteractions(columnsToKeep);
    return rowsData;
  }
}

module.exports = Pole3EIngestor;
