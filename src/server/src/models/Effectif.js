import Model from "./Model";

export default class Effectif extends Model {
  search(q) {
    return this.db
      .query(
        "SELECT * FROM etablissements_dsn_effectif WHERE siret = $1 ORDER BY mois",
        [q]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Effectif::search", e);
        return null;
      });
  }
  fileUploadedFormMonth(siret) {
    return this.db
      .query("SELECT DISTINCT(mois) FROM etablissements_dsn_effectif where siret = $1", [siret])
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Effectif:search", e);
        return null;
      });
  }
  findAllTranche() {
    return this.db
      .query("SELECT DISTINCT(effectif) FROM last_dsn_effectif")
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Effectif::findAll", e);
        return null;
      });
  }

  async findLastUpdateDate() {
    const result =  await this.db
      .query(`SELECT date FROM import_updates WHERE "table" = 'etablissements_dsn_eff'`);

    return result.rows[0].date;
  }
}
