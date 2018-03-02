const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");
const CommunesIngestor = require("./CommunesIngestor");

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

  getEtablissements() {
    return this.getData();
  }

  saveEntities() {
    let entities = { communes: [], codePostaux: [], departements: [] };
    const etablissements = this.getEtablissements();
    const communesIngestor = new CommunesIngestor();
    return communesIngestor
      .save(etablissements)
      .then(data => {
        entities.communes = data;
      })
      .then(() => {
        return entities;
      });
  }

  saveWithEntities(){
    let responseData = { etablissements: [], entities: {}};
    return this.save().then( data => {
      responseData.etablissements = data;
      return this.saveEntities();
    })
    .then( data => {
      responseData.entities = data;
      return responseData;
    })
  }
}

module.exports = EtablissementsIngestor;
