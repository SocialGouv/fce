import Model from "./Model";

export default class ApiKeys extends Model {
  getByKey(key) {
    return this.db
      .query("SELECT * FROM api_keys WHERE key = $1", [key])
      .then((res) => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch((e) => {
        console.error("ApiKeys::getByKey", e);
        return false;
      });
  }
}
