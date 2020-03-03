import Model from "./Model";

export default class UsersFeedback extends Model {
  create({ useful, comment = "" }) {
    return this.db
      .query('INSERT INTO "users_feedback" (useful, comment) VALUES ($1, $2)', [
        useful,
        comment
      ])
      .then(res => {
        return res && res.rowCount;
      })
      .catch(e => {
        console.error("UsersFeedback::create", e);
        return false;
      });
  }
}
