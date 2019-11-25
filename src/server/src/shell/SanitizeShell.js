const { Pool } = require("pg");
const config = require("config");
require("dotenv").config();
const Shell = require("./Shell");
const pool = new Pool(config.get("db"));

class SanitizeShell extends Shell {
  constructor(args, options) {
    super(args, options);
  }

  async getDistinctQuery(fields, table) {
    return `SELECT ${fields}, count(*) FROM ${table} GROUP BY ${fields} HAVING count(*) > 1`.toString();
  }

  async getDeleteQuery(fields, table, ...args) {
    let baseRequest = `DELETE FROM ${table} WHERE `;

    let i = 0;
    const requestFragment = [];
    fields.forEach(field => {
      const fragment = args[i].join(",");
      requestFragment.push(`${field} IN (${fragment})`);
      i++;
    });

    return `${baseRequest}${requestFragment.join(" AND ")};`.toString();
  }

  async execute() {
    console.log("Start Sanitize");
    const PgClient = await pool.connect().catch(error => {
      console.log(error);
    });
    console.log("Start PgClient connexion");

    config.sanitizeTables.map(async tableInfo => {
      const duplicatedEstablishmentPse = await PgClient.query(
        await this.getDistinctQuery(tableInfo.fields, tableInfo.table)
      ).catch(error => {
        console.log(error);
      });

      console.log("Start Sanitize Etablissements PSE");

      const siret = [];
      const numero_de_dossier = [];

      duplicatedEstablishmentPse.rows.forEach(data => {
        siret.push(`'${data.siret}'`);
        numero_de_dossier.push(`'${data.numero_de_dossier}'`);
      });

      console.log(`Found ${siret.length} duplications...`);

      if (siret.length !== 0) {
        await PgClient.query(
          await this.getDeleteQuery(
            tableInfo.fields.split(","),
            tableInfo.table,
            siret,
            numero_de_dossier
          )
        ).catch(error => {
          console.log(error);
        });

        console.log("deleted !");
      } else {
        console.log("Skiped...");
      }
    });

    PgClient.release();
  }
}

module.exports = SanitizeShell;
