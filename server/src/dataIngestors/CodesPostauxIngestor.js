const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const CodePostal = require("../models/CodePostalModel");
const Etablissement = require("../models/EtablissementModel");

class CodesPostauxIngestor extends Ingestor {
  constructor() {
    super();
    this.Model = CodePostal;
  }

  getData(params) {
    if (params && params.etablissements) {
      return this.getCodesPostauxFromEtablissements(params.etablissements);
    } else if (params && params.mongo) {
      return this.getCodesPostauxFromMongo();
    }
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

  getCodesPostauxFromMongo() {
    let postalCodes = [];
    return Etablissement.findDisctinctCodesPostaux().then(data => {
      const codes = data;
      codes.map(code => {
        let postalCode = {
          code_postal: code
        };
        postalCodes.push(postalCode);
      });
      return postalCodes;
    });
  }
}

module.exports = CodesPostauxIngestor;
