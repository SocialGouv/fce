const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Commune = require("../models/CommuneModel");

class CommunesIngestor extends Ingestor {
  constructor() {
    super();
    this.Model = Commune;
  }

  getData(etablissements) {
    return this.getCommunesFromEtablissements(etablissements);
  }

  getCommunesFromEtablissements(etablissements){
    let communes = [];
    let codes = []
    etablissements.map( etablissement => {
      let commune = {
        libelle_commune: etablissement.libelle_commune,
        code_commune: etablissement.code_commune,
      };
      if(!codes.includes(commune.code_commune) ){
        communes.push(commune);
        codes.push(commune.code_commune);
      }
    })
    return communes;
  }

}

module.exports = CommunesIngestor;
