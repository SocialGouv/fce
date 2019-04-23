import Model from "./Model";

export default class PolesCompetitivite extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query("SELECT * FROM poles_competitivite WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("PolesCompetitivite::findAllBySIRET", e);
        return [];
      });
  }
}
