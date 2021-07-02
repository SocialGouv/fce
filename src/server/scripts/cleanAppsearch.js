const config = require("config");
const AppSearchClient = require("@elastic/app-search-node");

const apiKey = config.elasticIndexer.appsearch_apiKey;
const baseUrlFn = () => config.elasticIndexer.appsearch_address;
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);
const engineName = config.elasticIndexer.appsearch_engineName;

const run = () => {
  return client.listDocuments(engineName).then((response) => {
    const toDestroy = response.results.map(({ id }) => id);
    console.log(`Stats ${response.meta.page.total_results} documents`);
    console.log(toDestroy.length);
    return client.destroyDocuments(engineName, toDestroy).then((res) => {
      console.log(`Deleted ${res.filter(({ deleted }) => deleted).length} documents`);
      if (response.meta.page.total_results > response.meta.page.size) {
        return run();
      }
    });
  });
}

run();
