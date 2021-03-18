import Model from "./Model";
import HttpError from "../utils/HttpError";

export default class Agreement extends Model {
  async findAllBySIREN(siren) {
    try {
      const agreementsQuery = this.db.query(
        "SELECT * FROM etablissements_accords WHERE siren=$1",
        [siren]
      );

      const agreementsBySiretQuery = this.db.query(
        `SELECT
          etab.siret,
          etab.etablissementsiege,
          etab.etatadministratifetablissement,
          ARRAY_AGG(ea.num_dos) agreements,
          MAX(ea.dt_sign) last_date_sign
        FROM
          etablissements etab
        RIGHT JOIN
          etablissements_accords ea on etab.siret = ea.siret
        WHERE
          etab.siren = $1
        GROUP BY
          etab.siret`,
        [siren]
      );

      const response = await Promise.all([
        agreementsQuery,
        agreementsBySiretQuery,
      ]);

      const [agreements, agreementsBySiret] = response;

      if (!agreements || !agreementsBySiret) {
        throw new HttpError(
          "Postgres query error (Agreement::findAllBySIREN)",
          500
        );
      }

      const totalCount = agreements.rowCount;

      if (!totalCount) {
        return {
          totalCount,
          agreementsList: [],
          fileNumbersBySiret: [],
        };
      }

      const agreementsList = agreements?.rows || [];
      const fileNumbersBySiret = (agreementsBySiret?.rows || []).map(
        ({
          siret,
          etablissementsiege,
          etatadministratifetablissement,
          agreements,
          last_date_sign,
        }) => {
          return {
            siret,
            category:
              etablissementsiege === "true"
                ? "Siège social"
                : "Établissement secondaire",
            state: etatadministratifetablissement,
            fileNumbers: agreements,
            count: agreements.length,
            lastSignatureDate: last_date_sign,
          };
        }
      );

      return {
        totalCount,
        agreementsList,
        fileNumbersBySiret,
      };
    } catch (e) {
      return e;
    }
  }
}
