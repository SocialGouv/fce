import Model from "./Model";

export default class InteractionsPole3ESEER extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query("SELECT * FROM interactions_pole_3e WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPole3ESEER::findAllBySIRET", e);
        return [];
      });
  }

  findAllBySIREN(siren) {
    return this.db
      .query("SELECT * FROM interactions_pole_3e WHERE siret ILIKE $1", [
        `${siren}%`
      ])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPole3ESEER::findAllBySIREN", e);
        return [];
      });
  }
}
