const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");
const CommunesIngestor = require("./CommunesIngestor");
const DepartementsIngestor = require("./DepartementsIngestor");

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
    const departementsIngestor = new DepartementsIngestor();

    return communesIngestor
      .save(etablissements)
      .then(data => {
        entities.communes = data;
        return departementsIngestor.save(etablissements);
      })
      .then(data => {
        entities.departements = data;
        return entities;
      });
  }

  save(shouldSaveEntities) {
    if (shouldSaveEntities) {
      let responseData = { etablissements: [], entities: {} };
      return super
        .save()
        .then(data => {
          responseData.etablissements = data;
          return this.saveEntities();
        })
        .then(data => {
          responseData.entities = data;
          return responseData;
        });
    } else {
      return super.save();
    }
  }

  resetEntities() {
    let entities = { communes: {}, codePostaux: {}, departements: {} };
    const etablissements = this.getEtablissements();
    const communesIngestor = new CommunesIngestor();
    const departementsIngestor = new DepartementsIngestor();
    return communesIngestor
      .reset()
      .then(data => {
        entities.communes = data;
        return departementsIngestor.reset();
      })
      .then(data => {
        entities.departements = data;

        return entities;
      });
  }

  reset(shouldResetEntities) {
    if (shouldResetEntities) {
      let responseData = { etablissements: {}, entities: {} };
      return super
        .reset()
        .then(data => {
          responseData.etablissements = data;
          return this.resetEntities();
        })
        .then(data => {
          responseData.entities = data;
          return responseData;
        });
    } else {
      return super.save();
    }
  }

  // saveWithEntities(){
  //
  // }
}

module.exports = EtablissementsIngestor;
