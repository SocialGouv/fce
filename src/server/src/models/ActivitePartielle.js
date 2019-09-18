import Model from "./Model";

export default class ActivitePartielle extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_activite_partielle WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("ActivitePartielle::getBySIRET", e);
        return null;
      });
  }

  getBySiren(siren) {
    return this.db
      .query("SELECT * FROM etablissements_activite_partielle WHERE siret ILIKE $1", [`${siren}%`])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("ActivitePartielle::getBySiren", e);
        return null;
      });
  }
}
