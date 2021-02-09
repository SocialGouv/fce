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

  getSatisfactionRates(startDate) {
    return this.db
      .query(
        `SELECT rate FROM "users_feedback" WHERE "rate" IS NOT NULL AND "rate" != "" AND "createdAt" >= '${startDate}'`
      )
      .then((res) => {
        return res.rows.map((row) => row.rate);
      })
      .catch((e) => {
        console.error("UsersFeedback::get", e);
        return false;
      });
  }
}
