import Model from "./Model";

const CODE_SANS_CONVENTION_COLLECTIVE = "9999";

export default class Idcc extends Model {
  getBySIRET(siret) {
    return this.db
      .query(
        `
        SELECT DISTINCT i.code, i.libelle
        FROM etablissements_idcc ei
        INNER JOIN idcc i ON ei.idcc = i.code
        WHERE siret = $1
        AND NOT code = '${CODE_SANS_CONVENTION_COLLECTIVE}'
        `,
        [siret]
      )
      .then((res) => res.rows)
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
        AND NOT code = '${CODE_SANS_CONVENTION_COLLECTIVE}'
        `,
        [siren]
      )
      .then((res) => res.rows)
      .catch((e) => {
        console.error("Idcc::getBySIREN", e);
        return null;
      });
  }
}
