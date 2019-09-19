import Model from "./Model";

export default class ActivitePartielle extends Model {
  getBySIRET(siret) {
    return this.db
      .query(
        "SELECT * FROM etablissements_activite_partielle WHERE siret = $1 ORDER BY date_decision, num_avenant",
        [siret]
      )
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
      .query(
        "SELECT * FROM etablissements_activite_partielle WHERE siret ILIKE $1 ORDER BY siret, date_decision, num_avenant",
        [`${siren}%`]
      )
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("ActivitePartielle::getBySiren", e);
        return null;
      });
  }
}
