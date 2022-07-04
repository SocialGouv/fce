import * as csv from "fast-csv";
import * as fs from "fs";
import * as path from "path";

import {
  createIndex,
  deleteOldIndices,
  getDocsCount,
  updateAlias,
} from "./elastic";
import { Enterprise, mapEnterprise } from "./enterprise";
import {Client, ClientOptions} from "@elastic/elasticsearch";
import {IExecuteFunctions} from "n8n-core";

let prevSiret = "";
async function* manipulate(
  stream: csv.CsvParserStream<
    csv.ParserRow<Enterprise>,
    csv.ParserRow<Enterprise>
  >
) {
  let countDone = 0;
  for await (const enterprise of stream) {
    prevSiret = enterprise.eta_siret;
    countDone++;
    if (countDone % 10000 === 0) {
      console.log(`created ${countDone} records`);
    }
    yield mapEnterprise(enterprise);
  }
}

const formatMs = (ms: number) => `${(ms / 1000).toFixed(2)} seconds.`;

// apply mapEntreprise to the CSV stream
// then bulk insert with Es client
const insertEntreprises = async (client: Client, indexName: string, file: string) => {
  const stream = fs.createReadStream(path.resolve(file));

  const csvStream = csv
    .parseStream(stream, { headers: true });

  const result = await client.helpers.bulk({
    // @ts-ignore
    datasource: manipulate(csvStream),
    onDocument: (enterprise: Enterprise) => ({
      index: {
        //_id: `${enterprise.siret}-${enterprise.idcc || ""}`,
        _index: indexName,
      },
    }),
    onDrop({ status, error }) {
      console.log(`dropped`, status, error);
    },
    refreshOnCompletion: true,
    concurrency: 5,
  });

  console.log("result:", JSON.stringify(result));

  console.log(`Total duration: ${formatMs(result.time)}`);

  if (result.failed === 0) {
    console.log(`Created ${result.successful} documents successfully`);
  } else {
    console.log(`${result.failed} documents failed, abort`);
    throw new Error(`${result.failed} documents failed, abort`);
  }
  //
};

type ElasticClientOptions = {
  url?: string;
  apiKey?: string;
};

export const createElasticClient = ({ url = "http://localhost:9200", apiKey }: ElasticClientOptions) => {

  const auth = apiKey ? { apiKey } : undefined;

// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/master/basic-config.html

  const esClientConfig: ClientOptions = {
    auth,
    node: url,
    maxRetries: 50,
    requestTimeout: 30000,
    disablePrototypePoisoningProtection: true,
  };

  console.log(esClientConfig);
  return new Client(esClientConfig);
};

type elasticIngestOptions = {
  indexName?: string;
  sourceFile: string;
  url?: string;
  apiKey?: string;
};

export const elasticIngest = async ({
  indexName: baseIndexName = "fce-search",
  sourceFile,
  url,
  apiKey
}: elasticIngestOptions) => {
  try {
    const client = createElasticClient({
      url,
      apiKey
    });

    console.log(`Creating index`);

    const indexName = await createIndex(client, baseIndexName);

    console.log(`Starting indexation in index ${indexName}...`);

    await insertEntreprises(client, indexName, sourceFile);

    console.log(`Indexation complete`);
    // ensure we have some data
    const docsCount = await getDocsCount(client, indexName);
    if (!docsCount) {
      throw new Error(
        `No document created in index ${indexName}, skip aliasing`
      );
    } else {
      console.log(`Created ${docsCount} documents in index ${indexName}`);
    }

    await updateAlias(client, indexName, baseIndexName);
    await deleteOldIndices(client, indexName, baseIndexName);
  } catch (err) {
    console.log("Error " + JSON.stringify(err, null, 2));
    throw err;
  }
};

type ElasticCredentials = {
  endPoint: string;
  apiKey: string;
};

export const getCredentialsFromContext = async (context: IExecuteFunctions): Promise<ElasticCredentials> =>
  await context.getCredentials("elasticsearch") as unknown as ElasticCredentials;
