import Model from "./Model";

export default class InteractionsPole3T extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query("SELECT * FROM interactions_pole_3t WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPole3T::findAllBySIRET", e);
        return [];
      });
  }
}
