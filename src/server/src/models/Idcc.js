import Model from "./Model";

export default class Idcc extends Model {
  getBySIRET(siret) {
    return this.db
      .query(
        `
        SELECT i.*
        FROM etablissements_idcc ei
        LEFT JOIN idcc i ON ei.idcc = i.code
        WHERE siret = $1
        `,
        [siret]
      )
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Idcc::getBySIRET", e);
        return null;
      });
  }
}
