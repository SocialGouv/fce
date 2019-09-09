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

  async search(terms, pagination) {
    const columns = await this._selectEntrepriseColumns();
    const { query, params } = this._buildSearchQuery(terms, pagination);

    return this.db
      .query(
        `
        SELECT etab.*, ${columns.map(
          ({ column_name }) => `ent.${column_name} as entreprise_${column_name}`
        )}, naf.libelle as activiteprincipaleetablissement_libelle
        ${query}
        `,
        params
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
    const { query, params } = this._buildSearchQuery(terms);

    return this.db
      .query(
        `
        SELECT count(etab.*) as items
        ${query}
        `,
        params
      )
      .then(res => {
        return res.rows && res.rows.length ? +res.rows[0].items : 0;
      })
      .catch(e => {
        console.error("Etablissements::searchCount", e);
        return null;
      });
  }

  _buildSearchQuery(
    { q, commune, codePostal, departement, naf, siegeSocial },
    pagination = null
  ) {
    const where = [];
    const params = [];
    let currentVar = 1;
    let limit = "";

    if (q) {
      where.push(`(
        plainto_tsquery('french', $${currentVar}) @@ etab.search_vector
      )`);
      params.push(q);
      currentVar++;
    }

    if (commune) {
      where.push(`etab.codecommuneetablissement = $${currentVar}`);
      params.push(commune);
      currentVar++;
    }

    if (codePostal) {
      where.push(`etab.codepostaletablissement = $${currentVar}`);
      params.push(codePostal);
      currentVar++;
    }

    if (departement) {
      where.push(`etab.codepostaletablissement ILIKE $${currentVar}`);
      params.push(`${departement}%`);
      currentVar++;
    }

    if (Array.isArray(naf) && naf.length) {
      where.push(`etab.activiteprincipaleetablissement = ANY($${currentVar})`);
      params.push(naf);
      currentVar++;
    }

    if (siegeSocial) {
      where.push(`etab.etablissementsiege = 'true'`);
    }

    if (pagination) {
      const { itemsByPage, startIndex } = pagination;
      limit = `LIMIT $${currentVar} OFFSET $${currentVar + 1}`;
      params.push(itemsByPage, startIndex);
    }

    const query = `
      FROM etablissements etab
      INNER JOIN entreprises ent ON etab.siren = ent.siren
      LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement
      WHERE ${where.join(" AND ")}
      ${limit}
    `;

    return {
      query,
      params
    };
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
