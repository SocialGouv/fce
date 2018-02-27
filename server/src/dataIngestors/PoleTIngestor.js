const InteractionsIngestor = require("./InteractionsIngestor");

class PoleTIngestor extends InteractionsIngestor {
  constructor(filePath, sheetName) {
    const pole = "T";
    super(filePath, sheetName, pole);
    const columnsToKeep = {
      A: "siret",
      C: "date",
      D: "unite",
      E: "type_intervention",
      F: "cible_intervention"
    };
    this.columnsToKeep = columnsToKeep;
  }
}

module.exports = PoleTIngestor;
