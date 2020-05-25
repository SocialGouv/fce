import Model from "./Model";

const TYPE_PSE = "PSE";
const TYPE_LICE = "Lice";
const TYPE_RCC = "RCC";
const CONDITION_DATE_36_MONTHS = `AND TO_DATE(e.date_enregistrement, 'YYYY-MM-DD') >= now() - '3 years'::interval`;

export default class Rupco extends Model {
  getPSEBySIRET(siret) {
    return this.getBySIRET(siret, TYPE_PSE, CONDITION_DATE_36_MONTHS);
  }

  getPSEBySIREN(siren) {
    return this.getBySIREN(siren, TYPE_PSE, CONDITION_DATE_36_MONTHS);
  }

  getLiceBySIRET(siret) {
    return this.getBySIRET(siret, TYPE_LICE);
  }

  getLiceBySIREN(siren) {
    return this.getBySIREN(siren, TYPE_LICE);
  }

  getRCCBySIRET(siret) {
    return this.getBySIRET(siret, TYPE_RCC, CONDITION_DATE_36_MONTHS);
  }

  getRCCBySIREN(siren) {
    return this.getBySIREN(siren, TYPE_RCC, CONDITION_DATE_36_MONTHS);
  }

  getBySIRET(siret, type, dateCondition = "") {
    return this.db
      .query(
        `
        SELECT DISTINCT ON (e.numero) e.*, p.etat
        FROM rupco_etablissements e
        INNER JOIN rupco_procedures p ON e.numero = p.numero
        WHERE e.siret = $1
        AND e.type ILIKE $2
        ${dateCondition}
        ORDER BY e.numero DESC`,
        [siret, `${type}%`]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Rupco::getBySIRET", e);
        return null;
      });
  }

  getBySIREN(siren, type, dateCondition = "") {
    return this.db
      .query(
        `
        SELECT DISTINCT ON (e.numero, e.siret) p.*, e.siret, e.nombre_de_ruptures_de_contrats_en_debut_de_procedure, e.nombre_de_ruptures_de_contrats_en_fin_de_procedure
        FROM rupco_etablissements e
        INNER JOIN rupco_procedures p ON e.numero = p.numero
        WHERE e.siren = $1
        AND e.type ILIKE $2
        ${dateCondition}
        ORDER BY e.numero DESC`,
        [siren, `${type}%`]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Rupco::getBySIREN", e);
        return null;
      });
  }
}
