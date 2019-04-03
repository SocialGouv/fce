import Model from "./Model";

export default class Departements extends Model {
  search(q) {
    return this.db
      .query("SELECT * FROM departements WHERE nom ILIKE $1 OR code = $2", [
        `%${q}%`,
        q
      ])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Departements::search", e);
        return null;
      });
  }
}
