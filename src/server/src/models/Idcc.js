import Model from "./Model";

export default class Idcc extends Model {
  getBySIRET(siret) {
    return this.db
      .query(
        `
        SELECT DISTINCT i.code, i.libelle
        FROM etablissements_idcc ei
        INNER JOIN idcc i ON ei.idcc = i.code
        WHERE siret = $1
        AND NOT code = '9999'
        `,
        [siret]
      )
      .then((res) => (res.rows && res.rows.length ? res.rows : null))
      .catch((e) => {
        console.error("Idcc::getBySIRET", e);
        return null;
      });
  }

  getBySIREN(siren) {
    return this.db
      .query(
        `
        SELECT DISTINCT i.code, i.libelle
        FROM etablissements_idcc ei
        INNER JOIN etablissements e ON e.siret = ei.siret
        INNER JOIN idcc i ON i.code = ei.idcc
        WHERE e.siren = $1
        AND NOT code = '9999'
        `,
        [siren]
      )
      .then((res) => (res.rows && res.rows.length ? res.rows : null))
      .catch((e) => {
        console.error("Idcc::getBySIREN", e);
        return null;
      });
  }
}
