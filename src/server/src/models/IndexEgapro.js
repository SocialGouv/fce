import Model from "./Model"

export default class IndexEgapro extends Model {
    async findBySiren(siren) {
        try {
            const indexes = await this.db.query("SELECT * from egapro_index where siren=$1 order by annee desc", [siren]);

            return indexes.rows;
        } catch (e) {
            throw e;
        }
    }
};