import Model from "./Model";

export default class Successions extends Model {
  getLastSuccesseurBySIRET(siret) {
    return this.db
      .query(
        "SELECT * FROM etablissements_successions WHERE siretetablissementpredecesseur = $1 ORDER BY dateliensuccession DESC limit 1",
        [siret]
      )
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Successions::getLastBySIRET", e);
        return null;
      });
  }

  getLastPredecesseurBySIRET(siret) {
    return this.db
      .query(
        "SELECT * FROM etablissements_successions WHERE siretetablissementsuccesseur = $1 ORDER BY dateliensuccession DESC limit 1",
        [siret]
      )
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Successions::getLastBySIRET", e);
        return null;
      });
  }
}
