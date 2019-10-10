import Model from "./Model";

export default class Pse extends Model {
  getBySIRET(siret) {
    return this.db
      .query("SELECT * FROM etablissements_pse WHERE siret = $1", [siret])
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Pse::getBySIRET", e);
        return null;
      });
  }

  getBySIREN(siren) {
    return this.db
      .query(
        "SELECT numero_de_dossier, type_de_dossier, etat_du_dossier, situation_juridique, nombre_de_ruptures_de_contrats_en_debut_de_procedure AS contrats_ruptures_debut, nombre_de_ruptures_de_contrats_en_fin_de_procedure AS contrats_ruptures_fin, siret FROM etablissements_pse WHERE siret ILIKE $1",
        [`${siren}%`]
      )
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Pse::getBySIREN", e);
        return null;
      });
  }
}
