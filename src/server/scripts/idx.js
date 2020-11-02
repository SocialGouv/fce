require("array.prototype.flatmap").shim();
const { Client } = require("@elastic/elasticsearch");
/** Create ElasticSearch client */
const elasticClient = new Client({
  node: "http://127.0.0.1:9200/",
  auth: {
    username: "commit42",
    password: "8zoC6ktzMbologQ"
  }
});
const fs = require("fs");
const JSONStream = require("JSONStream");
const es = require("event-stream");

const ENGINE_ID = "5f9feddaf6b49b342ed18942";
const INDEX_NAME = `.app-search-engine-${ENGINE_ID}`;

var getStream = function() {
  var jsonData = "/tmp/data/data.json",
    stream = fs.createReadStream(jsonData, { encoding: "utf8" }),
    parser = JSONStream.parse("*");
  return stream.pipe(parser);
};

let index = 0;
let chunk = [];

let st = getStream().pipe(
  es.mapSync(async function(data) {
    index++;

    chunk.push({
      ...data
    });
    if (chunk.length % 10000 === 0) {
      st.pause();

      console.log("pause -> send chunk...");

      const start = new Date();

      let body = chunk.flatMap(doc => [
        {
          index: { _index: INDEX_NAME, _id: doc.id }
        },
        { ...doc, engine_id: ENGINE_ID, __st_expires_after: null }
      ]);

      const response = await elasticClient
        .bulk({
          body
        })
        .then(response => {
          st.resume();

          console.log(
            "resume -> insert rows execution time: %dms",
            new Date() - start
          );

          return response;
        });

      const { body: bulkResponse } = response;

      //Error Handling
      if (bulkResponse.errors) {
        console.error("Has many errors !", { errors: bulkResponse.errors });
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

            console.log("erroredDocument", {
              status: action[operation].status,
              error: JSON.stringify(action[operation].error)
            });
          }
        });
      }

      chunk = [];
    }
  })
);
