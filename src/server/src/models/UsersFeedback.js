import Model from "./Model";

export default class UsersFeedback extends Model {
  create({ useful, comment = "", rate }) {
    return this.db
      .query(
        'INSERT INTO "users_feedback" (useful, comment, rate) VALUES ($1, $2, $3)',
        [useful, comment, rate]
      )
      .then((res) => {
        return res && res.rowCount;
      })
      .catch((e) => {
        console.error("UsersFeedback::create", e);
        return false;
      });
  }
}
