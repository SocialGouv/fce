require("array.prototype.flatmap").shim();
const { Client } = require("@elastic/elasticsearch");
const { Pool } = require("pg");
const config = require("config");
const Cursor = require("pg-cursor");
const elasticClient = new Client({
  node: config.elasticIndexer.client_address
});
const pool = new Pool(config.get("postgres"));

const startScriptTime = new Date();

let query = `SELECT etab.*, ${config.elasticIndexer.enterpriseFields.map(
  column_name => `ent.${column_name} as entreprise_${column_name}`
)}, naf.libelle as activiteprincipaleetablissement_libelle
        FROM etablissements etab
        INNER JOIN entreprises ent ON etab.siren = ent.siren
        LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement`;

console.log("Starting Elasticsearch indexation...");

/**
 * @returns {Promise<void>}
 */
let mainProcess = async () => {
  //Init PG Client and cursor
  const PgClient = await pool.connect();
  const establishmentResultCursor = PgClient.query(new Cursor(query));

  console.log("Create Elastic client");
  //Init Elastic Client
  await elasticClient.indices
    .delete({
      index: "_all"
    })
    .catch(error => console.log(error));
  await elasticClient.indices
    .create({
      index: "establishments",
      body: {
        mappings: {
          properties: {
            ...config.elasticIndexer.properties
          }
        }
      }
    })
    .catch(error => {
      console.log("Creating Elastic client code : ", error.body.status);
      console.log("Creating Elastic client body : ", error.body.error);
    });

  console.log("Start process Data");
  await processData(establishmentResultCursor, PgClient);

  pool.end();
};

/**
 * @param establishmentResultCursor
 * @param PgClient
 */
let processData = (establishmentResultCursor, PgClient) => {
  const start = new Date();
  establishmentResultCursor.read(
    config.elasticIndexer.cursor_size,
    (error, result) => {
      if (error) console.log(error);

      //console.log(result);
      //Get execution time for getting row set
      const end = new Date() - start;
      console.info("Row set execution time: %dms", end);
      console.log(result.length);

      //Recursive call to get all result set

      if (result.length !== 0) {
        insertBulk(result);
        processData(establishmentResultCursor, PgClient);
      } else {
        establishmentResultCursor.close(() => {
          console.info(
            "Final execution time: %dms",
            new Date() - startScriptTime
          );
          PgClient.release();
        });
      }
    }
  );
};

let insertBulk = async PgDataSet => {
  const bulkChunk = [];

  console.log("Map PgDataSet");
  PgDataSet.map(
    ({
      siren,
      siret,
      trancheeffectifsetablissement,
      etablissementsiege,
      etatadministratifetablissement,
      codepostaletablissement,
      libellecommuneetablissement,
      activiteprincipaleetablissement,
      activiteprincipaleetablissement_libelle
    }) => {
      bulkChunk.push({
        id: siret,
        siren,
        siret,
        trancheeffectifsetablissement,
        etablissementsiege,
        etatadministratifetablissement,
        codepostaletablissement,
        libellecommuneetablissement,
        activiteprincipaleetablissement,
        activiteprincipaleetablissement_libelle
      });
    }
  );

  let body = bulkChunk.flatMap(doc => [
    { index: { _index: "establishments" } },
    doc
  ]);

  const { body: bulkResponse } = await elasticClient.bulk({
    refresh: true,
    body
  });

  //Error Handling
  if (bulkResponse.errors) {
    const erroredDocuments = [];
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        });
      }
    });
    console.log(erroredDocuments);
  }

  const { body: count } = await elasticClient.count({
    index: "establishments"
  });
  console.log("Elastic have indexed " + count.count + " documents");
};

mainProcess().then((res, err) => {
  console.log(res);
  console.log(err);
});
