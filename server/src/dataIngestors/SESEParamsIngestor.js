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
    console.log("[SESEParamsIngestor] Parsing data");
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
    console.log("[SESEParamsIngestor] Saving data");
    const total = data.length;
    let processed = 0;
    const promises = data.map(SESEParam => {
      const siret = SESEParam.siret;

      console.log(`[SESEParamsIngestor] Updating etablissement ${siret}`);

      return Etablissement.update({ siret: siret }, { sese: SESEParam })
        .then(
          () => {
            console.log(
              `[SESEParamsIngestor] Processed etablissement ${siret}`
            );
          },
          err => console.error(`[SESEParamsIngestor] ${err}`)
        )
        .then(() => {
          processed++;
          console.log(
            `[SESEParamsIngestor] ${(processed * 100 / total).toFixed(
              2
            )}% - ${processed} / ${total}`
          );
        });
    });

    return Promise.all(promises).then(data => {
      console.log("[SESEParamsIngestor] Saved all data");
      const response = data.filter(d => d != undefined);
      console.log("[SESEParamsIngestor] response:", response);
      return response;
    });
  }

  reset() {
    console.log("[SESEParamsIngestor] reset");
    return Etablissement.update({ $unset: { sese: "" } });
  }
}

module.exports = SESEParamsIngestor;
