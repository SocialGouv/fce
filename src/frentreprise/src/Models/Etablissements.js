import Model from "./Model";

export default class Etablissements extends Model {
  async getBySiret(siret) {
    const columns = await this._selectEntrepriseColumns();

    return this.db
      .query(
        `
        SELECT etab.*, ${columns.map(
          ({ column_name }) => `ent.${column_name} as entreprise_${column_name}`
        )}, naf.libelle as activiteprincipaleetablissement_libelle
        FROM etablissements etab
        INNER JOIN entreprises ent ON etab.siren = ent.siren
        LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement
        WHERE etab.siret = $1`,
        [siret]
      )
      .then(res => {
        return res.rows && res.rows.length ? res.rows[0] : null;
      })
      .catch(e => {
        console.error("Etablissements::getBySiret", e);
        return null;
      });
  }

  async findBySiren(siren) {
    const columns = await this._selectEntrepriseColumns();

    return this.db
      .query(
        `
        SELECT etab.*, ${columns.map(
          ({ column_name }) => `ent.${column_name} as entreprise_${column_name}`
        )}, naf.libelle as activiteprincipaleetablissement_libelle
        FROM etablissements etab
        INNER JOIN entreprises ent ON etab.siren = ent.siren
        LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement
        WHERE etab.siren = $1`,
        [siren]
      )
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Etablissements::findBySiren", e);
        return null;
      });
  }

  async search({ q }, { startIndex, itemsByPage }) {
    const columns = await this._selectEntrepriseColumns();

    return this.db
      .query(
        `
        SELECT etab.*, ${columns.map(
          ({ column_name }) => `ent.${column_name} as entreprise_${column_name}`
        )}, naf.libelle as activiteprincipaleetablissement_libelle
        ${this._buildSearchQuery()}
        LIMIT $2 OFFSET $3`,
        [`%${q}%`, itemsByPage, startIndex]
      )
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Etablissements::search", e);
        return null;
      });
  }

  searchCount(terms) {
    return this.db
      .query(
        `
        SELECT count(etab.*) as items
        ${this._buildSearchQuery()}`,
        [`%${terms.q}%`]
      )
      .then(res => {
        return res.rows && res.rows.length ? +res.rows[0].items : 0;
      })
      .catch(e => {
        console.error("Etablissements::searchCount", e);
        return null;
      });
  }

  _buildSearchQuery() {
    return `
      FROM etablissements etab
      INNER JOIN entreprises ent ON etab.siren = ent.siren
      LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement
      WHERE ent.denominationunitelegale ILIKE $1
    `;
  }

  _selectEntrepriseColumns() {
    return this.db
      .query(
        `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'entreprises'`
      )
      .then(res => {
        return res.rows;
      })
      .catch(e => {
        console.error("Etablissements::_selectEntrepriseColumns", e);
        return null;
      });
  }
}
