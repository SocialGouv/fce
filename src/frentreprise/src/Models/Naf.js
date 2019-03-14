import Model from "./Model";

export default class Naf extends Model {
  getByCode(code) {
    return this.db
      .query("SELECT * FROM naf WHERE code = $1", [code.replace(/\./g, "")])
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Naf::getByCode", e);
        return null;
      });
  }
}
