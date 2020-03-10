import Model from "./Model";

export default class InteractionsPole3ESRC extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query(
        `
        SELECT 3e_src.*, regions.nom as region__name
        FROM interactions_pole_3e_src 3e_src
        LEFT JOIN regions ON regions.code = 3e_src.region
        WHERE 3e_src.siret = $1`,
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
        SELECT 3e_src.*, regions.nom as region__name
        FROM interactions_pole_3e_src 3e_src
        LEFT JOIN regions ON regions.code = 3e_src.region
        WHERE 3e_src.siret ILIKE $1`,
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
