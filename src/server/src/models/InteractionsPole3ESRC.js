import Model from "./Model";

export default class InteractionsPole3ESRC extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query(
        `
        SELECT i.*, r.nom as region__name
        FROM interactions_pole_3e_src i
        LEFT JOIN regions r ON r.code = i.region
        WHERE i.siret = $1`,
        [siret]
      )
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPole3ESRC::findAllBySIRET", e);
        return [];
      });
  }

  findAllBySIREN(siren) {
    return this.db
      .query(
        `
        SELECT i.*, r.nom as region__name
        FROM interactions_pole_3e_src i
        LEFT JOIN regions r ON r.code = i.region
        WHERE i.siret ILIKE $1`,
        [`${siren}%`]
      )
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("InteractionsPole3ESRC::findAllBySIREN", e);
        return [];
      });
  }
}
