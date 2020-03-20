const { Pool } = require("pg");
const config = require("config");
require("dotenv").config();
const Shell = require("./Shell");
const pool = new Pool(config.get("db"));

class SanitizeShell extends Shell {
  async getDistinctQuery(fields, table) {
    return `SELECT ${fields}, count(*) FROM ${table} GROUP BY ${fields} HAVING count(*) > 1`.toString();
  }

  async getDeleteQuery(hasId, fields, table) {
    const baseRequest = `DELETE FROM ${table} a USING ${table} b WHERE a.id < b.id AND `;

    if (hasId) {
      const requestFragment = [];
      fields.forEach(field => {
        requestFragment.push(`a.${field} = b.${field}`);
      });

      console.log(`${baseRequest}${requestFragment.join(" AND ")};`);

      return `${baseRequest}${requestFragment.join(" AND ")};`.toString();
    } else {
      console.log(
        `DELETE FROM ${table} a using ${table} b WHERE a=b and a.ctid < b.ctid;`
      );
      return `DELETE FROM ${table} a using ${table} b WHERE a=b and a.ctid < b.ctid;`.toString();
    }
  }

  async getDuplicatedRows(duplicatedTable, tableInfo) {
    const fields = {};
    duplicatedTable.rows.forEach(rowData => {
      tableInfo.fields.forEach(field => {
        if (!Array.isArray(fields[field])) {
          fields[field] = [];
        }
        fields[field].push(`'${rowData[field]}'`);
      });
    });

    return fields;
  }

  async execute() {
    console.log("Start Sanitize");
    const PgClient = await pool.connect().catch(error => {
      console.error(error);
    });
    console.log("Start PgClient connexion");

    config.sanitizeTables.map(async tableInfo => {
      await PgClient.query(
        await this.getDistinctQuery(tableInfo.fields.join(","), tableInfo.table)
      )
        .then(async rowData => {
          console.log(`Start Sanitize ${tableInfo.table}`);

          const fields = await this.getDuplicatedRows(rowData, tableInfo);

          const firstTableConfigField = fields[tableInfo.fields[0]];

          console.log(
            `Found ${
              firstTableConfigField ? firstTableConfigField.length : 0
            } duplications...`
          );

          if (firstTableConfigField && firstTableConfigField.length !== 0) {
            await PgClient.query(
              await this.getDeleteQuery(
                tableInfo.hasId,
                tableInfo.fields,
                tableInfo.table
              )
            ).catch(error => {
              console.error(error);
            });

            console.log("deleted !");
          } else {
            console.log("Skiped...");
          }
        })
        .catch(error => {
          console.error(error);
        });
    });

    PgClient.release();
  }
}

export default SanitizeShell;
