import Model from "./Model";

export default class InteractionsPole3E extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query("SELECT * FROM interactions_pole_3e WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPole3E::findAllBySIRET", e);
        return [];
      });
  }
}
