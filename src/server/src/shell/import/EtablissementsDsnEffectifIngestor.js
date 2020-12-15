const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class EtablissementsDsnEffectifIngestor extends Ingestor {
  /**
   * Remove duplicate content and breaklines for inspecteurs
   */
  async beforePsqlCopy() {
    this._wipeLastDsnTable();
    this._buildFromAllSiret();
    this._updateUniteNonEmployeuse();
    this._updateLastMonthEffectif();
    this._updateSecteurPlublic();
  }

  _wipeLastDsnTable() {
    console.log("TRUNCATE TABLE last_dsn_effectif");
    const query = `TRUNCATE TABLE last_dsn_effectif`;
    return execSync(`${this.psql} "${query}"`);
  }

  _buildFromAllSiret() {
    console.log("Populating table with all siret");

    const query = `INSERT INTO last_dsn_effectif (siret) SELECT siret FROM etablissements`;
    return execSync(`${this.psql} "${query}"`);
  }

  _updateUniteNonEmployeuse() {
    console.log("Addin NN");

    const query = `UPDATE last_dsn_effectif
    SET trancheeffectifsetablissement=subquery.trancheeffectifsetablissement
    FROM (SELECT trancheeffectifsetablissement, siret
          FROM  etablissements WHERE trancheeffectifsetablissement='NN') AS subquery
    WHERE last_dsn_effectif.siret=subquery.siret`;
    return execSync(`${this.psql} "${query}"`);
  }

  _updateLastMonthEffectif() {
    console.log("Updating last month effectif knows");

    const query = `UPDATE last_dsn_effectif SET effectif=subquery.effectif, mois=subquery.mois 
    FROM (SELECT siret, eff AS effectif, MAX(mois) AS mois FROM etablissements_dsn_effectif GROUP BY siret, eff) AS subquery
    WHERE last_dsn_effectif.siret=subquery.siret`;
    return execSync(`${this.psql} "${query}"`);
  }

  _updateSecteurPlublic() {
    console.log("Setting service public");

    const query = `UPDATE last_dsn_effectif SET trancheeffectifsetablissement='SP'
    FROM (SELECT siret FROM etablissements 
     WHERE siren IN (SELECT siren
    FROM "entreprises"
    WHERE "categoriejuridiqueunitelegale" LIKE '7%')) AS subquery
    WHERE last_dsn_effectif.siret=subquery.siret`;
    return execSync(`${this.psql} "${query}"`);
  }
}

module.exports = EtablissementsDsnEffectifIngestor;
