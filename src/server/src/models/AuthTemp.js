import Model from "./Model";

export default class AuthTemp extends Model {
  create() {
    return this.db
      .query(
        'INSERT INTO "auth_temporary" (activated) VALUES (true) RETURNING id'
      )
      .then((res) => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch((e) => {
        console.error("AuthTemp::create", e);
        return false;
      });
  }

  desactivate(id) {
    return this.db
      .query("UPDATE auth_temporary SET activated = false WHERE id = $1", [id])
      .then((res) => {
        return res && res.rowCount;
      })
      .catch((e) => {
        console.error("AuthTemp::useToken", e);
        return false;
      });
  }

  getById(id) {
    return this.db
      .query("SELECT * FROM auth_temporary WHERE id = $1", [id])
      .then((res) => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch((e) => {
        console.error("AuthTemp::getById");
        return false;
      });
  }

  delete(id) {
    return this.db
      .query("DELETE FROM auth_temporary WHERE id = $1", [id])
      .then((res) => {
        return res && res.rowCount;
      })
      .catch((e) => {
        console.error("AuthTemp::delete", e);
        return false;
      });
  }
}
