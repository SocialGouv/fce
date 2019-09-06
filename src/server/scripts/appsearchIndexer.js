const AppSearchClient = require("@elastic/app-search-node");
const apiKey = "private-xy1juusc1pwcapuxqjn7ku92";
const baseUrlFn = () => "http://appsearch:3002/api/as/v1/";
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);
const { Pool } = require("pg");
const config = require("config");
const Cursor = require("pg-cursor");

const pool = new Pool(config.get("postgres"));

const startScriptTime = new Date();

let query = `SELECT etab.*, ${config.elasticIndexer.enterpriseFields.map(
  column_name => `ent.${column_name} as entreprise_${column_name}`
)}, naf.libelle as activiteprincipaleetablissement_libelle
        FROM etablissements etab
        INNER JOIN entreprises ent ON etab.siren = ent.siren
        LEFT JOIN naf ON naf.code = etab.activiteprincipaleetablissement`;

let mainProcess = async () => {
  //Init PG Client and cursor
  const PgClient = await pool.connect();
  const establishmentResultCursor = PgClient.query(new Cursor(query));

  console.log("Create Elastic client");
  //www todo
  console.log("Start process Data");
  await processData(establishmentResultCursor, PgClient);
};

let processData = (establishmentResultCursor, PgClient) => {
  const start = new Date();
  establishmentResultCursor.read(100, (error, result) => {
    if (error) console.log(error);

    console.log(result.length);

    //Recursive call to get all result set

    if (result.length !== 0) {
      insertBulk(result).then(result => {
        console.log("indexing...");
        const engineName = "bfce";
        client
          .indexDocuments(engineName, result)
          .then(response => {
            //Get execution time for getting row set
            const end = new Date() - start;
            console.info("Row set execution time: %dms", end);

            processData(establishmentResultCursor, PgClient);
          })
          .catch(error => console.log(error));
      });
    } else {
      establishmentResultCursor.close(() => {
        console.info(
          "Final execution time: %dms",
          new Date() - startScriptTime
        );
        PgClient.release();
      });
    }
  });
};

let insertBulk = async PgDataSet => {
  const bulkChunk = [];

  console.log("Map PgDataSet");
  await PgDataSet.map(
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

  return bulkChunk;
};

mainProcess();
