import Model from "./Model";

export default class Sources extends Model {
  getAll() {
    return this.db
      .query("SELECT fournisseur, si, date FROM import_updates")
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Sources::get", e);
        return null;
      });
  }
}
