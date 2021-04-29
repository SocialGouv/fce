const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class EtablissementsDsnEffectifIngestor extends Ingestor {
  /*
   * drop index to table
   */
  beforePsqlCopy() {
    console.log("BeforSave : drop index");
    return execSync(`${this.psql} "DROP INDEX etablissements_effectif_siret"`);
  }

  /**
   * add Index to siret
   */
  async afterPsqlCopy() {
    console.log("afterSave : create index");
    return execSync(
      `${this.psql} "CREATE INDEX etablissements_effectif_siret ON etablissements_dsn_effectif USING btree (siret)"`
    );
  }
}

module.exports = EtablissementsDsnEffectifIngestor;
