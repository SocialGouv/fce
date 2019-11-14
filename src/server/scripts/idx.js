const AppSearchClient = require("@elastic/app-search-node");
const config = require("config");
/** Create App-search client */
const apiKey = config.elasticIndexer.appsearch_apiKey;
const baseUrlFn = () => config.elasticIndexer.appsearch_address;
const engineName = config.elasticIndexer.appsearch_engineName;
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);
const fs = require("fs");
const JSONStream = require("JSONStream");
const es = require("event-stream");

var getStream = function() {
  var jsonData = "/mnt/data/data.json",
    stream = fs.createReadStream(jsonData, { encoding: "utf8" }),
    parser = JSONStream.parse("*");
  return stream.pipe(parser);
};

let index = 0;
let chunk = [];

let st = getStream().pipe(
  es.mapSync(function(data) {
    index++;

    chunk.push(data);
    if (chunk.length % 50 === 0) {
      st.pause();

      console.log("pause -> send chunk...");

      const start = new Date();

      client
        .indexDocuments(engineName, chunk)
        .then(response => {
          //Get execution time for getting row set
          st.resume();

          console.log(
            "resume -> insert rows execution time: %dms",
            new Date() - start
          );
        })
        .catch(error => {
          console.error(error);
        });

      chunk = [];
    }
  })
);
