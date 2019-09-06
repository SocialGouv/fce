require("array.prototype.flatmap").shim();
const { Client } = require("@elastic/elasticsearch");
const { Pool } = require("pg");
const config = require("config");
const elasticClient = new Client({
  node: config.elasticIndexer.client_address
});
const pool = new Pool(config.get("postgres"));

let query = `select * from etablissements where need_reindex = true`;

/**
 * @returns {Promise<void>}
 */
let mainProcess = async () => {
  //Init PG Client and cursor
  const PgClient = await pool.connect();
  const establishmentResult = PgClient.query(query);

  const establishmentResultCount = establishmentResult.length;

  for (let i = 0; i < establishmentResultCount; $i++) {
    console.log(establishmentResult[i]);
  }

  await elasticClient
    .update({
      id: "x_mcOW0BXB85cLPJ6aJ0",
      type: "_doc",
      index: "establishments",
      body: {
        doc: {
          trancheeffectifsetablissement: "okok"
        }
      }
    })
    .catch(error => {
      console.log(error.body);
      console.log(error.body.code);
    });
};

mainProcess();
