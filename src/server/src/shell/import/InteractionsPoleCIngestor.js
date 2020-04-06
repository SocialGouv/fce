const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class InteractionsPoleCIngestor extends Ingestor {
  async afterPsqlCopy() {
    this._convertDates(this.getConfig("table"));
  }

  async afterBuildHistory() {
    this._convertDates(this.getConfig("historyTable"));
  }

  _convertDates(table) {
    console.log(`Convert date 3 columns to 1 column for table ${table}`);

    return execSync(
      `${this.psql} "UPDATE ${table} SET date = concat(
        "annee",
         '-',
        CASE WHEN "mois"='janvier' THEN '01'
        WHEN "mois"='février' THEN '02'
        WHEN "mois"='mars' THEN '03'
        WHEN "mois"='avril' THEN '04'
        WHEN "mois"='mai' THEN '05'
        WHEN "mois"='juin' THEN '06'
        WHEN "mois"='juillet' THEN '07'
        WHEN "mois"='août' THEN '08'
        WHEN "mois"='septembre' THEN '09'
        WHEN "mois"='octobre' THEN '10'
        WHEN "mois"='novembre' THEN '11'
        ELSE '12' END,
        '-',
        LPAD("jour", 2, '0')
        );"`
    );
  }
}

module.exports = InteractionsPoleCIngestor;
