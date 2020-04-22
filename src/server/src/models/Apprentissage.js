import Model from "./Model";

export default class Apprentissage extends Model {
  findAllBySIRET(siret) {
    return this.db
      .query(
        "SELECT * FROM etablissements_apprentissage WHERE siret = $1 AND TO_DATE(date_debut, 'DD/MM/YYYY') < (SELECT date FROM import_updates WHERE \"table\" = 'etablissements_apprentissage')",
        [siret]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Apprentissage::findAllBySIRET", e);
        return [];
      });
  }

  findAllBySIREN(siren) {
    return this.db
      .query(
        "SELECT * FROM etablissements_apprentissage WHERE siret ILIKE $1 AND TO_DATE(date_debut, 'DD/MM/YYYY') < (SELECT date FROM import_updates WHERE \"table\" = 'etablissements_apprentissage')",
        [`${siren}%`]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        console.error("Apprentissage::findAllBySIREN", e);
        return [];
      });
  }
}
