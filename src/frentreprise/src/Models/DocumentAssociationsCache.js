import Model from "./Model";

export default class DocumentAssociationsCache extends Model {
  getBySiret(siret) {
    return this.db
      .query(
        "SELECT * FROM document_associations_cache WHERE siret = $1 ORDER BY createdAt DESC",
        [siret]
      )
      .then(res => {
        return res && res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("DocumentAssociationsCache::getBySiret", e);
        return null;
      });
  }
}
