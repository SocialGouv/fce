import Model from "./Model";

export default class Communes extends Model {
  search(q) {
    return this.db
      .query("SELECT * FROM communes WHERE nom like $1 OR code_postal = $2", [
        `%${q.toUpperCase()}%`,
        q
      ])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Communes::search", e);
        return null;
      });
  }
}
