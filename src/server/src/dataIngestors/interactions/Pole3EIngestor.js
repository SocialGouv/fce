const InteractionsIngestor = require("./InteractionsIngestor");

class Pole3EIngestor extends InteractionsIngestor {
  constructor(filePath, sheetName) {
    const pole = "3E";
    super(filePath, sheetName, pole);
    const columnsToKeep = {
      A: "siret",
      C: "date",
      D: "unite",
      E: "type_intervention"
    };
    this.columnsToKeep = columnsToKeep;
  }
}

module.exports = Pole3EIngestor;
