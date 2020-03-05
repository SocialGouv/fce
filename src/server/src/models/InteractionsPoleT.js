import Model from "./Model";

export default class InteractionsPoleT extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query("SELECT * FROM interactions_pole_t WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPoleT::findAllBySIRET", e);
        return [];
      });
  }

  findAllBySIREN(siren) {
    return this.db
      .query("SELECT * FROM interactions_pole_t WHERE siret ILIKE $1", [
        `${siren}%`
      ])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPoleT::findAllBySIREN", e);
        return [];
      });
  }
}
