import Model from "./Model";
import HttpError from "../utils/HttpError";

export default class Psi extends Model {
  async getNumberOfEmployees(siren) {
    try {
      const employeesBySirenQuery = this.db.query(
        "SELECT siren, salaries_distincts FROM psi_siren WHERE siren=$1 and year='2020'",
        [siren]
      );

      const employeesBySiretQuery = this.db.query(
        "SELECT siret, salaries_distincts FROM psi_siret WHERE siret LIKE $1 and year='2020'",
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
        enterprises: employeesBySiren.rows,
        establisments: employeesBySiret.rows,
      };
    } catch (e) {
      return e;
    }
  }
}
