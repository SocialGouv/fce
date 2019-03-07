import Model from "./Model";

export default class Naf extends Model {
  search(q) {
    return this.db
      .query("SELECT * FROM naf WHERE libelle ILIKE $1 OR code ILIKE $1", [
        `%${q}%`
      ])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Naf::search", e);
        return null;
      });
  }
}
