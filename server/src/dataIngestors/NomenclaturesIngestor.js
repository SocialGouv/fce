const Ingestor = require("./Ingestor");
const WorkbookHelper = require("../helpers/WorkbookHelper");

class NomenclaturesIngestor extends Ingestor {
  constructor(filePath) {
    super(filePath);
  }

  getNomenclatures() {
    const wbh = new WorkbookHelper(this.workbook);

    const sheetsParams = {
      Code_activite_NAF: {
        columnsToKeep: {
          A: "code",
          B: "libelle"
        }
      },
      Code_Qualite_siege_2: {
        columnsToKeep: {
          A: "code",
          B: "libelle"
        }
      },
      Code_Qualite_siege: {
        columnsToKeep: {
          A: "code",
          B: "libelle"
        }
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
      }
    };

    const sheetsData = wbh.getSheetsData(sheetsParams);
    for (let sheetName in sheetsData) {
      sheetsData[sheetName].map(nomenclature => {
        nomenclature.categorie = sheetName;
      });
    }
    return sheetsData;
  }
}

module.exports = NomenclaturesIngestor;
