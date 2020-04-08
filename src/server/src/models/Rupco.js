import Model from "./Model";
import siretToSiren from "../utils/siretToSiren";

export default class Rupco extends Model {
  getPSEBySIRET(siret) {
    return this.db
      .query(
        `
        SELECT e.*, p.etat, etabs.*
        FROM rupco_etablissements e
        INNER JOIN rupco_procedures p ON e.numero = p.numero
        LEFT JOIN (SELECT ent.numero, string_agg(ent.siret, ',') as etablissements FROM rupco_etablissements ent WHERE ent.siren=$2 GROUP BY ent.siren, ent.numero ) etabs ON etabs.numero = e.numero
        WHERE e.siret = $1
        AND e.type LIKE 'PSE%'
        AND TO_DATE(e.date_enregistrement, 'YYYY-MM-DD') >= now() - '3 years'::interval`,
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
        "SELECT numero_de_dossier, type_de_dossier, etat_du_dossier, situation_juridique, date_de_jugement, date_d_enregistrement AS date_enregistrement, nombre_de_ruptures_de_contrats_en_debut_de_procedure AS contrats_ruptures_debut, nombre_de_ruptures_de_contrats_en_fin_de_procedure AS contrats_ruptures_fin, siret FROM etablissements_pse WHERE siret ILIKE $1",
        [`${siren}%`]
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
