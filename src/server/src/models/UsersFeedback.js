import Model from "./Model";

export default class UsersFeedback extends Model {
  create({ useful, comment = "", rate, referer }) {
    return this.db
      .query(
        'INSERT INTO "users_feedback" (useful, comment, rate, referer) VALUES ($1, $2, $3, $4)',
        [useful, comment, rate, referer]
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
