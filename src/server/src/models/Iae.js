import Model from "./Model";

export default class Iae extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_iae WHERE siret = $1", [siret])
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Iae::getBySIRET", e);
        return null;
      });
  }
}
