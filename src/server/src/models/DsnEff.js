import Model from "./Model";

export default class DsnEff extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_dsn_eff WHERE siret = $1", [siret])
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("DsnEff::getBySIRET", e);
        return null;
      });
  }
}
