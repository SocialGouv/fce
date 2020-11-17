import Model from "./Model";

export default class Establishment extends Model {
  getAddress(siret) {
    return this.db
      .query(
        `SELECT
          numerovoieetablissement,
          indicerepetitionetablissement,
          typevoieetablissement,
          libellevoieetablissement,
          complementadresseetablissement
        FROM etablissements
        WHERE siret = $1`,
        [siret],
        false
      )
      .then((res) => {
        const data = res && res.rows.length && res.rows[0];

        if (!data) {
          return null;
        }

        const numeroVoie = data.numerovoieetablissement || "";
        const indiceRepetition = data.indicerepetitionetablissement || "";
        const typeVoie = data.typevoieetablissement
          ? data.typevoieetablissement
          : "";
        const libelleVoie = data.libellevoieetablissement
          ? data.libellevoieetablissement
          : "";
        const sep1 = numeroVoie || indiceRepetition ? " " : "";
        const sep2 = !!sep1 || typeVoie ? " " : "";

        return {
          adresse: `${numeroVoie}${indiceRepetition}${sep1}${typeVoie}${sep2}${libelleVoie}`,
          complement_adresse: data.complementadresseetablissement,
        };
      })
      .catch((e) => {
        console.error("EstablishmentAddress::get", e);
        return false;
      });
  }
}
