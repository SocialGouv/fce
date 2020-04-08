import Model from "./Model";
import siretToSiren from "../utils/siretToSiren";

export default class Rupco extends Model {
  constructor() {
    super();
    this.TYPE_PSE = "PSE";
    this.TYPE_LICE = "Lice";
    this.TYPE_RCC = "RCC";
  }
  getBySIRET(siret, type) {
    return this.db
      .query(
        `
        SELECT DISTINCT ON (e.numero) e.*, p.etat, etabs.*
        FROM rupco_etablissements e
        INNER JOIN rupco_procedures p ON e.numero = p.numero
        LEFT JOIN (SELECT ent.numero, string_agg(ent.siret, ',') as etablissements FROM rupco_etablissements ent WHERE ent.siren=$2 GROUP BY ent.siren, ent.numero ) etabs ON etabs.numero = e.numero
        WHERE e.siret = $1
        AND e.type ILIKE $3
        AND TO_DATE(e.date_enregistrement, 'YYYY-MM-DD') >= now() - '3 years'::interval
        ORDER BY e.numero DESC`,
        [siret, siretToSiren(siret), `${type}%`]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Rupco::getBySIRET", e);
        return null;
      });
  }

  getBySIREN(siren, type) {
    return this.db
      .query(
        `
        SELECT DISTINCT ON (e.numero, e.siret) p.*, e.siret, e.nombre_de_ruptures_de_contrats_en_debut_de_procedure, e.nombre_de_ruptures_de_contrats_en_fin_de_procedure
        FROM rupco_etablissements e
        INNER JOIN rupco_procedures p ON e.numero = p.numero
        WHERE e.siren = $1
        AND e.type ILIKE $2
        AND TO_DATE(e.date_enregistrement, 'YYYY-MM-DD') >= now() - '3 years'::interval
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
