const Ingestor = require("./Ingestor");
const WorkbookHelper = require("../helpers/WorkbookHelper");
const Nomenclature = require("../models/NomenclatureModel");

class NomenclaturesIngestor extends Ingestor {
  constructor(filePath) {
    super(filePath);
    this.Model = Nomenclature;
  }

  getData() {
    const wbh = new WorkbookHelper(this.workbook);
    const defaultColumnsToKeep = {
      columnsToKeep: {
        A: "code",
        B: "libelle"
      }
    };
    const sheetsParams = {
      Code_activite_NAF: {
        columnsToKeep: defaultColumnsToKeep
      },
      Code_Qualite_siege_2: {
        columnsToKeep: defaultColumnsToKeep
      },
      Code_Qualite_siege: {
        columnsToKeep: defaultColumnsToKeep
      },
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
      Tranche_effectif: defaultColumnsToKeep,
      Code_Modalite_activ_: defaultColumnsToKeep,
      Codes_IDCC: defaultColumnsToKeep,
      code_etat: defaultColumnsToKeep,
      code_région: defaultColumnsToKeep
    };

    const sheetsData = wbh.getSheetsData(sheetsParams);
    for (let sheetName in sheetsData) {
      sheetsData[sheetName].map(nomenclature => {
        nomenclature.categorie = sheetName;
      });
    }
    return sheetsData;
  }

  getNomenclatures() {
    return this.getData();
  }
}

module.exports = NomenclaturesIngestor;
