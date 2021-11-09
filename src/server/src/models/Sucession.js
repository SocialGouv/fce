import Model from "./Model";

export default class Succession extends Model {
    getBySiret(siret) {
        return this.db
            .query(`
              SELECT *
              FROM etablissements_successions
              WHERE siretetablissementpredecesseur = $1
                 OR siretetablissementsuccesseur = $1
            `, [siret])
            .then(res => res.rows)
            .catch(e => {
                console.error("Succession::get", e);
                return null;
            });
    }
};
