import Model from "./Model";

export default class UcEff extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_uc_eff WHERE siret = $1",
        [+siret]
      )
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("UcEff::getBySIRET", e);
        return null;
      });
  }
}