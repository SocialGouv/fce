import { Client } from "@elastic/elasticsearch";
import { mappings } from "./enterprise";

const getIndexPattern = (indexName: string) => `${indexName}-*`;

const analysis = {
  analyzer: {
    french_indexing: {
      filter: [
        "french_elision",
        "lowercase",
        // company labels do not include diatrics
        "asciifolding",
        "french_stop",
        "french_stemmer",
        // very important filter in order to remove duplication between
        // the different naming fields (nom, enseigne, denomination...)
        "unique",
      ],
      tokenizer: "standard",
    },
  },
  filter: {
    french_elision: {
      articles: [
        "l",
        "m",
        "t",
        "qu",
        "n",
        "s",
        "j",
        "d",
        "c",
        "jusqu",
        "quoiqu",
        "lorsqu",
        "puisqu",
      ],
      articles_case: true,
      type: "elision",
    },
    french_stemmer: {
      language: "light_french",
      type: "stemmer",
    },
    french_stop: {
      stopwords: "_french_",
      type: "stop",
    },
  },
};

const index = {
  similarity: {
    bm25_no_norm_length: {
      b: 0,
      type: "BM25",
    },
  },
};

export const deleteOldIndices = async (client: Client, indexToKeep: string, indexName: string): Promise<void> => {
  const allIndices: string[] = await client.cat
    .indices({ format: "json" })
    .then((indices) => indices.map(
      ({ index }) => index || ""
    )
  );

  // list indices to delete
  const matchingIndices = allIndices.filter(
    (index) =>
      index.startsWith(getIndexPattern(indexName).substring(0, getIndexPattern(indexName).length - 2)) &&
      // tslint:disable-next-line:triple-equals
      index != indexToKeep
  );

  const deletePromises = matchingIndices.map((index) =>
    client.indices.delete({ index })
  );

  await Promise.all(deletePromises)
    .then(() => console.log(`Indices deleted: ${matchingIndices}`))
    .catch(() =>
      console.error(`Error when trying to delete ${matchingIndices}`)
    );
};

export const updateAlias = (client: Client, newIndexName: string, oldIndexName: string) => {
  console.log(`Remove alias ${getIndexPattern(oldIndexName)} for ${oldIndexName}`);
  console.log(`Set Alias ${oldIndexName} to ${newIndexName}`);
  return client.indices.updateAliases({
    body: {
      actions: [
        {
          remove: {
            alias: oldIndexName,
            index: getIndexPattern(oldIndexName),
          },
        },
        {
          add: {
            alias: oldIndexName,
            index: newIndexName,
          },
        },
      ],
    },
  });
};

export const createIndex = async (client: Client, indexName: string): Promise<string> => {
  const id = Math.floor(Math.random() * 10e8);
  const newIndexName = `${indexName}-${id}`;
  const body = { mappings, settings: { analysis, index } };
  await client.indices.create({
  // @ts-ignore
    body,
    index: newIndexName,
  });
  return newIndexName;
};

export const getDocsCount = async (client: Client, indexName: string): Promise<number> => {
  const stats = await client.indices.stats({ index: indexName });

  // @ts-ignore
  return stats._all.primaries.docs.count;
};
