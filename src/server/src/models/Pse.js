import Model from "./Model";

export default class Pse extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_pse WHERE siret = $1", [siret])
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Pse::getBySIRET", e);
        return null;
      });
  }

  getBySiren(siren) {
    return this.db
      .query("SELECT * FROM etablissements_pse WHERE siret = $1", [`${siren}%`])
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Pse::getBySiren", e);
        return null;
      });
  }
}
