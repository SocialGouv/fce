import Model from "./Model";

export default class ContratsAides extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_contrats_aides WHERE siret = $1", [
        siret
      ])
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("ContratsAides::getBySIRET", e);
        return null;
      });
  }
}
