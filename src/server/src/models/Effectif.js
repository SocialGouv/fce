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
  fileUploadedFormMonth() {
    return this.db
      .query("SELECT DISTINCT(mois) FROM etablissements_dsn_effectif")
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
}
