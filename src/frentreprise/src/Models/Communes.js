import Model from "./Model";

export default class Communes extends Model {
  getByCode(code) {
    return this.db
      .query("SELECT * FROM communes WHERE code_insee = $1", [code])
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Communes::getByCode", e);
        return null;
      });
  }
}
