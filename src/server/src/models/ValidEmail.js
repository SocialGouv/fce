import Model from "./Model";

export default class ValidEmail extends Model {
  exists(q) {
    return this.db
      .query(
        "SELECT * FROM valid_email WHERE email = $1",
        [q.toLowerCase()]
      )
      .then((res) => {
        return res.rows.length > 0;
      });
  }
}
