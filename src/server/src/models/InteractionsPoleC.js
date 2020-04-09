import Model from "./Model";

export default class InteractionsPoleC extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query("SELECT * FROM interactions_pole_c WHERE siret = $1", [siret])
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("InteractionsPoleC::findAllBySIRET", e);
        return [];
      });
  }

  findAllBySIREN(siren) {
    return this.db
      .query("SELECT * FROM interactions_pole_c WHERE siret ILIKE $1", [
        `${siren}%`,
      ])
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("InteractionsPoleC::findAllBySIREN", e);
        return [];
      });
  }
}
