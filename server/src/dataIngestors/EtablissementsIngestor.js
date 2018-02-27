const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");

class EtablissementsIngestor extends Ingestor {
  constructor(filePath) {
    const defaultSheetName = "Sheet1";
    super(filePath, defaultSheetName);
    this.Model = Etablissement;
  }

  getData() {
    const wsh = new WorksheetHelper(this.workSheet, {
      keysToLowerCase: true
    });

    const rowsData = wsh.getRowsData();
    return rowsData;
  }

  getEtablissements(){
    return this.getData();
  }

}

module.exports = EtablissementsIngestor;
