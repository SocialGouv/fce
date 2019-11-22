const { Pool } = require("pg");
const Cursor = require("pg-cursor");
const config = require("config");
const pLimit = require("p-limit");
const fs = require("fs");

/** Create PG Pool */
const pool = new Pool(config.get("db"));
/** Define concurrent request limit */
const limit = pLimit(config.elasticIndexer.appsearch_concurencyLimit);
let tasks = [];
let totalDocuments = 0;

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
    //www todo
    console.log("Start process Data");
    tasks.push(
      limit(() =>
        this.processData(establishmentResultCursor, PgClient).catch(error =>
          console.error(error)
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
          if (error) {
            console.error(error);
            return false;
          }

          totalDocuments += result.length;

          console.log(
            { results: result.length },
            { totalDocuments: totalDocuments }
          );

          if (result.length !== 0) {
            tasks.push(
              limit(() =>
                this.processData(establishmentResultCursor, PgClient).catch(
                  error => console.error(error)
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

                fs.appendFile(
                  "/tmp/data/data.json",
                  JSON.stringify(result),
                  function(err) {
                    if (err) {
                      reject();
                      throw err;
                    }
                    console.log("chunk saved");
                    resolve();
                  }
                );
              })
              .catch(error => {
                console.error(error);
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
                  .catch(error => console.error(error));
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
        codecommuneetablissement,
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

        const establishment_name =
          denominationusuelleetablissement ||
          enseigne1etablissement ||
          enseigne2etablissement ||
          enseigne3etablissement;

        const naf_division =
          (activiteprincipaleetablissement &&
            activiteprincipaleetablissement.slice(0, 2)) ||
          null;

        const departement =
          (codepostaletablissement && codepostaletablissement.slice(0, 2)) ||
          null;

        if (
          entreprise_categoriejuridiqueunitelegale ===
          config.elasticIndexer.appSearchConst.physicPersonJuridicCode
        ) {
          enterprise_name = `${entreprise_prenomusuelunitelegale} ${entreprise_nomunitelegale}`;
        }

        const joinedValues = [
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
          entreprise_nomusageunitelegale,
          codecommuneetablissement,
          enterprise_name,
          establishment_name,
          naf_division,
          departement
        ]
          .filter(field => !!field)
          .join(" ");

        bulkChunk.push({
          id: siret,
          external_id: siret,
          siren$string: siren,
          siret$string: siret,
          enterprise_name$string: enterprise_name,
          entreprise_denominationunitelegale$string: entreprise_denominationunitelegale,
          establishment_name$string: establishment_name,
          trancheeffectifsetablissement$string: trancheeffectifsetablissement,
          etablissementsiege$string: etablissementsiege,
          etatadministratifetablissement$string: etatadministratifetablissement,
          codepostaletablissement$string: codepostaletablissement,
          departement$string: departement,
          libellecommuneetablissement$string: libellecommuneetablissement,
          naf_division$string: naf_division,
          codecommuneetablissement$string: codecommuneetablissement,
          activiteprincipaleetablissement$string: activiteprincipaleetablissement,
          activiteprincipaleetablissement_libelle$string: activiteprincipaleetablissement_libelle,
          denominationusuelleetablissement$string: denominationusuelleetablissement,
          enseigne1etablissement$string: enseigne1etablissement,
          enseigne2etablissement$string: enseigne2etablissement,
          enseigne3etablissement$string: enseigne3etablissement,
          entreprise_denominationusuelle1unitelegale$string: entreprise_denominationusuelle1unitelegale,
          entreprise_denominationusuelle2unitelegale$string: entreprise_denominationusuelle2unitelegale,
          entreprise_denominationusuelle3unitelegale$string: entreprise_denominationusuelle3unitelegale,
          entreprise_prenomusuelunitelegale$string: entreprise_prenomusuelunitelegale,
          entreprise_nomunitelegale$string: entreprise_nomunitelegale,
          entreprise_prenom1unitelegale$string: entreprise_prenom1unitelegale,
          entreprise_nomusageunitelegale$string: entreprise_nomusageunitelegale,
          entreprise_categoriejuridiqueunitelegale$string: entreprise_categoriejuridiqueunitelegale,
          __st_text_summary: joinedValues
        });
      }
    );

    return bulkChunk;
  }
}

module.exports = IndexerUtils;
