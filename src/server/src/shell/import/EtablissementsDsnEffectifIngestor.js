const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class EtablissementsDsnEffectifIngestor extends Ingestor {
  /**
   * Remove duplicate content and breaklines for inspecteurs
   */
  async afterPsqlCopy() {
    this._wipeLastDsnTable();
    this._buildFromAllSiret();
    this._updateLastMonthEffectif();
    this._updateTrancheEffectif();
    this._updateUniteNonEmployeuse();
    this._updateSecteurPlublic();
  }

  _updateTrancheEffectif() {
    console.log("Replace tranche for effectif");
    return execSync(
      `${this.psql} "UPDATE last_dsn_effectif
      SET trancheeffectifsetablissement =
        CASE
          WHEN effectif IS NULL THEN '-'
          WHEN effectif = 0 THEN '0'
          WHEN effectif > 0 AND effectif <= 2 THEN '01'
          WHEN effectif > 2 AND effectif <= 5 THEN '02'
          WHEN effectif > 5 AND effectif < 10 THEN '03'
          WHEN effectif >= 10 AND effectif < 20 THEN '11'
          WHEN effectif >= 20 AND effectif < 50 THEN '12'
          WHEN effectif >= 50 AND effectif < 100 THEN '21'
          WHEN effectif >= 100 AND effectif < 250 THEN '22'
          WHEN effectif >= 250 AND effectif < 500 THEN '31'
          WHEN effectif >= 500 AND effectif < 1000 THEN '32'
          WHEN effectif >= 1000 AND effectif < 2000 THEN '41'
          WHEN effectif >= 2000 AND effectif < 5000 THEN '42'
          WHEN effectif >= 5000 THEN '51'
         ELSE '-'
        END"`
    );
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
    console.log("Add in NN");

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
