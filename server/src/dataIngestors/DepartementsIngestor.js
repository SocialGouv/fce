const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Departement = require("../models/DepartementModel");

class DepartementsIngestor extends Ingestor {
  constructor() {
    super();
    this.Model = Departement;
  }

  getData(etablissements) {
    return this.getDepartementsFromEtablissements(etablissements);
  }

  getDepartementsFromEtablissements(etablissements) {
    let departements = [];
    let codes = [];
    etablissements.map(etablissement => {
      let departement = {
        code_departement: etablissement.code_departement
      };
      if (!codes.includes(departement.code_departement)) {
        departements.push(departement);
        codes.push(departement.code_departement);
      }
    });
    return departements;
  }
}

module.exports = DepartementsIngestor;
