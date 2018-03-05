const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");

class SESEParamsIngestor extends Ingestor {
  constructor(filePath) {
    super(filePath);
    const sheetName = this.workbook.SheetNames[0];
    this.workSheet = this.workbook.Sheets[sheetName];
  }

  getData() {
    const wsh = new WorksheetHelper(this.workSheet, {
      keysToLowerCase: true
    });

    const rowsData = wsh.getRowsData();
    return rowsData;
  }

  getSESEParams() {
    return this.getData();
  }

  save() {
    const data = this.getData();
    const promises = data.map(SESEParam => {
      const siret = SESEParam.siret;

      return Etablissement.findBySIRET(siret).then(etablissement => {
        if (etablissement) {
          etablissement.sese = SESEParam;
          return etablissement.save();
        }
        return;
      });
    });

    return Promise.all(promises).then(data => {
      const response = data.filter(d => d != undefined);
      return response;
    });
  }

  reset() {
    return Etablissement.update({ $unset: { sese : "" } });
  }
}

module.exports = SESEParamsIngestor;
