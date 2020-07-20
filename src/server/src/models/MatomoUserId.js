import Model from "./Model";

export default class MatomoUserId extends Model {
  create({ saltedEmail }) {
    return this.db
      .query(
        'INSERT INTO "matomo_user_id" (user_id) VALUES ($1)',
        [saltedEmail]
      )
      .then((res) => {
        return res && res.rowCount;
      })
      .catch((e) => {
        console.error("MatomoUserId::create", e);
        return false;
      });
  }
}
