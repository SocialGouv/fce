import Model from "./Model";

export default class AuthRequests extends Model {
  create({ email, code }) {
    return this.db
      .query(
        'INSERT INTO "authentification_requests" (email, code) VALUES ($1, $2)',
        [email, code]
      )
      .then((res) => {
        return res && res.rowCount;
      })
      .catch((e) => {
        console.error("AuthRequests::create", e);
        return false;
      });
  }

  incrementFailure(email) {
    return this.db
      .query(
        "UPDATE authentification_requests SET failures = failures + 1 WHERE email = $1",
        [email]
      )
      .then((res) => {
        return res && res.rowCount;
      })
      .catch((e) => {
        console.error("AuthRequests::incrementFailure", e);
        return false;
      });
  }

  delete(email) {
    return this.db
      .query("DELETE FROM authentification_requests WHERE email = $1", [email])
      .then((res) => {
        return res && res.rowCount;
      })
      .catch((e) => {
        console.error("AuthRequests::delete", e);
        return false;
      });
  }
}
