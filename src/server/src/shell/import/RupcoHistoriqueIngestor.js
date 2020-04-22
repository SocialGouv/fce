const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class RupcoHistoriqueIngestor extends Ingestor {
  async afterPsqlCopy() {
    this._convertDateFormat(this.getConfig("table"));
    this._setHistoricSiFlag(this.getConfig("table"));
  }

  _convertDateFormat(table) {
    console.log("convertDateFormat");
    return execSync(
      `${this.psql} "UPDATE ${table} SET "date_enregistrement" = to_char(to_date(date_enregistrement, 'DD/MM/YYYY'), 'YYYY-MM-DD'), "date_jugement" = to_char(to_date(date_jugement, 'DD/MM/YYYY'), 'YYYY-MM-DD');"`
    );
  }

  _setHistoricSiFlag(table) {
    console.log("setHistoricDataFlag");
    return execSync(`${this.psql} "UPDATE ${table} SET historique_si = TRUE"`);
  }
}

module.exports = RupcoHistoriqueIngestor;
