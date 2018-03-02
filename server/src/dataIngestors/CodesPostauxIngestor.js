const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const CodePostal = require("../models/CodePostalModel");

class CodesPostauxIngestor extends Ingestor {
  constructor() {
    super();
    this.Model = CodePostal;
  }

  getData(etablissements) {
    return this.getCodesPostauxFromEtablissements(etablissements);
  }

  getCodesPostauxFromEtablissements(etablissements) {
    let postalCodes = [];
    let codes = [];
    etablissements.map(etablissement => {
      let postalCode = {
        code_postal: etablissement.code_postal
      };
      if (!codes.includes(postalCode.code_postal)) {
        postalCodes.push(postalCode);
        codes.push(postalCode.code_postal);
      }
    });
    return postalCodes;
  }
}

module.exports = CodesPostauxIngestor;
