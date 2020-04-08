import Model from "./Model";
import siretToSiren from "../utils/siretToSiren";

export default class Rupco extends Model {
  getPSEBySIRET(siret) {
    return this.db
      .query(
        `
        SELECT DISTINCT ON (e.numero) e.*, p.etat, etabs.*
        FROM rupco_etablissements e
        INNER JOIN rupco_procedures p ON e.numero = p.numero
        LEFT JOIN (SELECT ent.numero, string_agg(ent.siret, ',') as etablissements FROM rupco_etablissements ent WHERE ent.siren=$2 GROUP BY ent.siren, ent.numero ) etabs ON etabs.numero = e.numero
        WHERE e.siret = $1
        AND e.type ILIKE 'PSE%'
        AND TO_DATE(e.date_enregistrement, 'YYYY-MM-DD') >= now() - '3 years'::interval
        ORDER BY e.numero DESC`,
        [siret, siretToSiren(siret)]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Rupco::getPSEBySIRET", e);
        return null;
      });
  }

  getPSEBySIREN(siren) {
    return this.db
      .query(
        `
        SELECT e.*, p.etat
        FROM rupco_etablissements e
        INNER JOIN rupco_procedures p ON e.numero = p.numero
        WHERE e.siren = $1
        AND e.type ILIKE 'PSE%'
        AND TO_DATE(e.date_enregistrement, 'YYYY-MM-DD') >= now() - '3 years'::interval
        ORDER BY e.numero DESC`,
        [siren]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Rupco::getPSEBySIREN", e);
        return null;
      });
  }
}
