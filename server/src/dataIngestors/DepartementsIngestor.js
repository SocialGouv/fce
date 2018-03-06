const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Departement = require("../models/DepartementModel");
const Etablissement = require("../models/EtablissementModel");

class DepartementsIngestor extends Ingestor {
  constructor() {
    super();
    this.Model = Departement;
  }

  getData(params) {
    if (params && params.etablissements) {
      return this.getDepartementsFromEtablissements(params.etablissements);
    } else if (params && params.mongo) {
      return this.getDepartementsFromMongo();
    }
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

  getDepartementsFromMongo() {
    let departements = [];
    return Etablissement.findDisctinctDepartements().then(data => {
      const codes = data;
      codes.map(code => {
        let departement = {
          code_departement: code
        };
        departements.push(departement);
      });
      return departements;
    });
  }
}

module.exports = DepartementsIngestor;
