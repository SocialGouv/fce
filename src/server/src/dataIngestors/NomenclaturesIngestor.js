const Ingestor = require("./Ingestor");
const WorkbookHelper = require("../helpers/WorkbookHelper");
const NomenclatureModel = require("../models/NomenclatureModel");

class NomenclaturesIngestor extends Ingestor {
  constructor(filePath) {
    super(filePath);
    this.Model = NomenclatureModel;
  }

  getData() {
    const nomenclatures = this.getNomenclatures();
    const keys = Object.keys(nomenclatures);
    let data = [];

    keys.map(key => {
      data = [...data, ...nomenclatures[key]];
    });
    return data;
  }

  getNomenclatures() {
    const wbh = new WorkbookHelper(this.workbook);
    const defaultSheetsParams = {
      columnsToKeep: {
        A: "code",
        B: "libelle"
      }
    };
    const sheetsParams = {
      Code_activite_NAF: defaultSheetsParams,
      Code_Qualite_siege_2: defaultSheetsParams,
      Code_Qualite_siege: defaultSheetsParams,
      "Source_dernier_eff_phy ": {
        columnsToKeep: {
          A: "code",
          B: "libelle_court",
          C: "libelle"
        }
      },
      Code_CJ3: {
        columnsToKeep: {
          A: "code",
          B: "libelle_CJ3",
          C: "libelle_CJ1"
        }
      },
      Tranche_effectif: defaultSheetsParams,
      Code_Modalite_activ_: defaultSheetsParams,
      Codes_IDCC: defaultSheetsParams,
      code_etat: defaultSheetsParams,
      code_région: defaultSheetsParams
    };

    let sheetsData = wbh.getSheetsData(sheetsParams);
    for (let sheetName in sheetsData) {
      sheetsData[sheetName] = sheetsData[sheetName].map(nomenclature => {
        nomenclature.categorie = sheetName.toLowerCase().trim();
        return nomenclature;
      });
    }
    return sheetsData;
  }
}

module.exports = NomenclaturesIngestor;
