import Model from "./Model";
import { getYear } from "date-fns";

export default class Apprentissage extends Model {
  async getBySiren(siren) {
    const response = await this.db.query(
      "SELECT * FROM etablissements_apprentissage WHERE siren = $1",
      [siren]
    );

    return response.rows;
  }

  async getBySiret(siret) {
    const response = await this.db.query(
      "SELECT * FROM etablissements_apprentissage WHERE siret = $1",
      [siret]
    );

    return response.rows;
  }

  async getMaxYear() {
    const response = await this.db.query(
      `SELECT date FROM import_updates WHERE "table" = 'etablissements_apprentissage'`
    );

    if (!response.rows.length) return null;

    return getYear(response.rows[0].date);
  }
}
