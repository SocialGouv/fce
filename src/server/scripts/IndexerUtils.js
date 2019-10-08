const { Pool } = require("pg");
const Cursor = require("pg-cursor");
const config = require("config");
const pLimit = require("p-limit");
const AppSearchClient = require("@elastic/app-search-node");
/** Create App-search client */
const apiKey = config.elasticIndexer.appsearch_apiKey;
const baseUrlFn = () => config.elasticIndexer.appsearch_address;
const engineName = config.elasticIndexer.appsearch_engineName;
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);
/** Create PG Pool */
const pool = new Pool(config.get("postgres"));
/** Define concurrent request limit */
const limit = pLimit(config.elasticIndexer.appsearch_concurencyLimit);
let tasks = [];

const startScriptTime = new Date();

class IndexerUtils {
  constructor(query, type) {
    this.mainProcess(query).catch(error => console.log(error));
    this.type = type;
  }
  async mainProcess(query) {
    //Init PG Client and cursor
    const PgClient = await pool.connect();
    const establishmentResultCursor = PgClient.query(new Cursor(query));

    console.log("Create Elastic client");
    //www todo
    console.log("Start process Data");
    tasks.push(
      limit(() =>
        this.processData(establishmentResultCursor, PgClient).catch(error =>
          console.log(error)
        )
      )
    );
  }

  processData(establishmentResultCursor, PgClient) {
    const start = new Date();
    return new Promise((resolve, reject) => {
      establishmentResultCursor.read(
        config.elasticIndexer.cursor_size,
        (error, result) => {
          if (error) console.log(error);

          console.log(result.length);
          if (result.length !== 0) {
            tasks.push(
              limit(() =>
                this.processData(establishmentResultCursor, PgClient).catch(
                  error => console.log(error)
                )
              )
            );
            this.insertBulk(result)
              .then(result => {
                console.log(
                  "indexing...",
                  "active process:",
                  limit.activeCount,
                  "pending process:",
                  limit.pendingCount
                );
                client
                  .indexDocuments(engineName, result)
                  .then(response => {
                    //Get execution time for getting row set
                    const end = new Date() - start;
                    console.info("Row set execution time: %dms", end);
                    resolve();
                  })
                  .catch(error => {
                    console.log(error);
                    reject();
                  });
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            establishmentResultCursor.close(() => {
              console.info(
                "Final execution time: %dms",
                new Date() - startScriptTime
              );

              if (this.type === "update") {
                console.log("Clean reindex queue");
                PgClient.query(
                  "update etablissements set need_reindex = false where need_reindex = true"
                )
                  .then(() => {
                    console.log("Done");
                    PgClient.release();
                    resolve();
                  })
                  .catch(error => console.log(error));
              } else {
                PgClient.release();
                resolve();
              }
            });
          }
        }
      );
    });
  }

  async insertBulk(PgDataSet) {
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
        activiteprincipaleetablissement_libelle,
        denominationusuelleetablissement,
        enseigne1etablissement,
        enseigne2etablissement,
        enseigne3etablissement,
        entreprise_nomunitelegale,
        entreprise_categoriejuridiqueunitelegale,
        entreprise_prenomusuelunitelegale,
        entreprise_denominationunitelegale,
        entreprise_denominationusuelle1unitelegale,
        entreprise_denominationusuelle2unitelegale,
        entreprise_denominationusuelle3unitelegale,
        entreprise_prenom1unitelegale,
        entreprise_nomusageunitelegale
      }) => {
        let enterprise_name = entreprise_denominationunitelegale;
        let establishment_name =
          denominationusuelleetablissement ||
          enseigne1etablissement ||
          enseigne2etablissement ||
          enseigne3etablissement;

        if (
          entreprise_categoriejuridiqueunitelegale ===
          config.elasticIndexer.appSearchConst.physicPersonJuridicCode
        ) {
          enterprise_name = `${entreprise_prenomusuelunitelegale} ${entreprise_nomunitelegale}`;
        }

        bulkChunk.push({
          id: siret,
          siren,
          siret,
          enterprise_name,
          establishment_name,
          trancheeffectifsetablissement,
          etablissementsiege,
          etatadministratifetablissement,
          codepostaletablissement,
          libellecommuneetablissement,
          activiteprincipaleetablissement,
          activiteprincipaleetablissement_libelle,
          denominationusuelleetablissement,
          enseigne1etablissement,
          enseigne2etablissement,
          enseigne3etablissement,
          entreprise_denominationusuelle1unitelegale,
          entreprise_denominationusuelle2unitelegale,
          entreprise_denominationusuelle3unitelegale,
          entreprise_prenomusuelunitelegale,
          entreprise_nomunitelegale,
          entreprise_prenom1unitelegale,
          entreprise_nomusageunitelegale,
          entreprise_categoriejuridiqueunitelegale
        });
      }
    );

    return bulkChunk;
  }
}

module.exports = IndexerUtils;
