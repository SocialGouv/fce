import Model from "./Model";

export default class Accords extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_accords WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Accords::getBySIRET", e);
        return null;
      });
  }
}
