import Model from "./Model";

export default class Entreprises extends Model {
  getBySiren(siren) {
    return this.db
      .query(
        `
        SELECT ent.*, cj.libelle as categoriejuridiqueunitelegale_libelle, naf.libelle as activiteprincipaleunitelegale_libelle
        FROM entreprises ent
        LEFT JOIN categorie_juridique cj ON cj.code = ent.categoriejuridiqueunitelegale
        LEFT JOIN naf ON naf.code = ent.activiteprincipaleunitelegale
        WHERE siren = $1`,
        [siren]
      )
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Entreprises::getBySiren", e);
        return null;
      });
  }
}
