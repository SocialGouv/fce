import Model from "./Model";
import HttpError from "../utils/HttpError";

export default class Psi extends Model {
  async getNumberOfEmployees(siren) {
    try {
      const employeesBySirenQuery = this.db.query(
        "SELECT siren, salaries_annee_courante as current_year, salaries_annee_precedente as last_year FROM psi_siren WHERE siren=$1",
        [siren]
      );

      const employeesBySiretQuery = this.db.query(
        "SELECT siret, salaries_annee_courante as current_year, salaries_annee_precedente as last_year FROM psi_siret WHERE siret LIKE $1",
        [`${siren}%`]
      );

      const response = await Promise.all([
        employeesBySirenQuery,
        employeesBySiretQuery,
      ]);

      const [employeesBySiren, employeesBySiret] = response;

      if (!employeesBySiren || !employeesBySiret) {
        throw new HttpError("Postgres query error (Psi::getBySIREN)");
      }

      return {
        enterprise: employeesBySiren.rows.length
          ? {
              current_year: employeesBySiren.rows[0].current_year,
              last_year: employeesBySiren.rows[0].last_year,
            }
          : {
              current_year: 0,
              last_year: 0,
            },
        establishments: employeesBySiret.rows.length
          ? employeesBySiret.rows
          : [],
      };
    } catch (e) {
      return e;
    }
  }
}
