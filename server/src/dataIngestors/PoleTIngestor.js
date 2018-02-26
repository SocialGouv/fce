const InteractionsIngestor = require("./InteractionsIngestor");

class PoleTIngestor extends InteractionsIngestor {
  constructor(filePath, sheetName) {
    const pole = "T";
    super(filePath, sheetName, pole);
  }

  getInteractions() {
    const columnsToKeep = {
      A: "siret",
      C: "date",
      D: "unite",
      E: "type_intervention",
      F: "cible_intervention"
    };
    const rowsData = super.getInteractions(columnsToKeep);
    return rowsData;
  }
}

module.exports = PoleTIngestor;
