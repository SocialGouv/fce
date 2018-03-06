const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Commune = require("../models/CommuneModel");
const Etablissement = require("../models/EtablissementModel");

class CommunesIngestor extends Ingestor {
  constructor() {
    super();
    this.Model = Commune;
  }

  getData(params) {
    if (params && params.etablissements) {
      return this.getCommunesFromEtablissements(params.etablissements);
    } else if (params && params.mongo) {
      return this.getCommunesFromMongo();
    }
  }

  getCommunesFromEtablissements(etablissements) {
    let communes = [];
    let codes = [];
    etablissements.map(etablissement => {
      let commune = {
        libelle_commune: etablissement.libelle_commune,
        code_commune: etablissement.code_commune
      };
      if (!codes.includes(commune.code_commune)) {
        communes.push(commune);
        codes.push(commune.code_commune);
      }
    });
    return communes;
  }

  getCommunesFromMongo() {
    let communes = [];
    return Etablissement.findDisctinctCommunes().then(data => {
      const codes = data;
      codes.map(code => {
        let commune = {
          libelle_commune: code
        };
        communes.push(commune);
      });
      return communes;
    });
  }
}

module.exports = CommunesIngestor;
