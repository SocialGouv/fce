import Model from "./Model";

export default class MagicLinks extends Model {
  create({ email, key }) {
    return this.db
      .query('INSERT INTO "magic_links" (email, key) VALUES ($1, $2)', [
        email,
        key
      ])
      .then(res => {
        return res && res.rowCount;
      })
      .catch(e => {
        console.error("MagicLinks::create", e);
        return false;
      });
  }

  validate(key) {
    return this.db
      .query("UPDATE magic_links SET validated_at = NOW() WHERE key = $1", [
        key
      ])
      .then(res => {
        return res && res.rowCount;
      })
      .catch(e => {
        console.error("MagicLinks::validate", e);
        return false;
      });
  }
}
