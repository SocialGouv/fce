const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class EtablissementsDsnEffectif extends Ingestor {
  /**
   * Remove duplicate content and breaklines for inspecteurs
   */
  async afterPsqlCopy() {
    this._wipeLasDsnTable();
    this._buildFromAllSiret();
    this._updateUniteNonEmployeuse();
    this._updateLastMonthEffectif();
    this._updateSecteurPlublic();
  }

  __wipeLasDsnTable() {
    const query = `TRUNCATE TABLE last_dsn_effectif`;
    return execSync(`${this.psql} "${query}"`);
  }

  _buildFromAllSiret() {
    const query = `INSERT INTO last_dsn_effectif  (siret) SELECT FROM etablissements`;
    return execSync(`${this.psql} "${query}"`);
  }

  _updateUniteNonEmployeuse() {
    const query = `UPDATE last_dsn_effectif
    SET trancheeffectifsetablissement=subquery.trancheeffectifsetablissement
    FROM (SELECT trancheeffectifsetablissement, siret
          FROM  etablissements WHERE trancheeffectifsetablissement='NN') AS subquery
    WHERE last_dsn_effectif.siret=subquery.siret`;
    return execSync(`${this.psql} "${query}"`);
  }

  _updateLastMonthEffectif() {
    const query = `UPDATE last_dsn_effectif SET effectif=subquery.effectif, mois=subquery.mois 
    FROM (SELECT siret, eff AS effectif, MAX(mois) AS mois FROM etablissements_dsn_effectif GROUP BY siret, eff) AS subquery
    WHERE last_dsn_effectif.siret=subquery.siret`;
    return execSync(`${this.psql} "${query}"`);
  }

  _updateSecteurPlublic() {
    const query = `UPDATE last_dsn_effectif SET trancheeffectifsetablissement='SP'
    FROM (SELECT siret FROM etablissements 
     WHERE siren IN (SELECT siren
    FROM "entreprises"
    WHERE "categoriejuridiqueunitelegale" LIKE '7%')) AS subquery
    WHERE last_dsn_effectif.siret=subquery.siret`;
    return execSync(`${this.psql} "${query}"`);
  }

  _updateLastDsnTable() {
    return execSync(`${this.psql} "${query}"`);
  }
}

module.exports = InteractionsPole3EIngestor;
