const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");
const CommunesIngestor = require("./CommunesIngestor");
const DepartementsIngestor = require("./DepartementsIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");

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
    let entities = { communes: [], codesPostaux: [], departements: [] };
    const etablissements = this.getEtablissements();
    const communesIngestor = new CommunesIngestor();
    const departementsIngestor = new DepartementsIngestor();
    const codesPostauxIngestor = new CodesPostauxIngestor();
    const saveParams = {
      etablissements
    };
    return communesIngestor
      .save(saveParams)
      .then(data => {
        entities.communes = data;
        return departementsIngestor.save(saveParams);
      })
      .then(data => {
        entities.departements = data;
        return codesPostauxIngestor.save(saveParams);
      })
      .then(data => {
        entities.codesPostaux = data;
        return entities;
      });
  }

  save(params) {
    if (params && params.shouldSaveEntities) {
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
    let entities = { communes: {}, codesPostaux: {}, departements: {} };
    const etablissements = this.getEtablissements();
    const communesIngestor = new CommunesIngestor();
    const departementsIngestor = new DepartementsIngestor();
    const codesPostauxIngestor = new CodesPostauxIngestor();

    return communesIngestor
      .reset()
      .then(data => {
        entities.communes = data;
        return departementsIngestor.reset();
      })
      .then(data => {
        entities.departements = data;
        return codesPostauxIngestor.reset();
      })
      .then(data => {
        entities.codesPostaux = data;

        return entities;
      });
  }

  reset(params) {
    if (params && params.shouldResetEntities) {
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
      return super.reset();
    }
  }
}

module.exports = EtablissementsIngestor;
