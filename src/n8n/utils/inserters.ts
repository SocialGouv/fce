import {
  conflictSafeInsert,
  createConstraints,
  createIndexes,
  deleteIndexes,
  dropConstraints, fastInsert,
  getAllConstraints,
  getAllIndexes,
  InsertMethod
} from "./postgre";
import {Pool, PoolClient} from "pg";
import * as path from "path";
import {DOWNLOAD_STORAGE_PATH} from "./constants";
import {promisifyStream} from "./stream";
import {createReadStream, createWriteStream} from "fs";
import {IngestDbConfig} from "./ingestDb";

export type Inserter<T> = {
  onInit?: () => Promise<T> | T,
  onTeardown?: (initData: T) => Promise<void> | void,
  insert: InsertMethod
};

type PostgreInitOutput = {
  client: PoolClient,
  // tslint:disable-next-line:no-any
  constraints: any[],
  // tslint:disable-next-line:no-any
  indexes: any[]
};

export const createPostgreInserter = (params: IngestDbConfig, pool: Pool): Inserter<PostgreInitOutput> => ({
  onInit: async () => {
    const client = await pool.connect();
    const constraints = await getAllConstraints(client, params.table);

    if (!params.keepConstraints) {
      await dropConstraints(client, constraints);
    }

    const indexes = await getAllIndexes(client, params.table);
    if (!params.keepConstraints) {
      await deleteIndexes(client, indexes);
    }

    return {
      client,
      constraints,
      indexes
    };
  },
  onTeardown: async ({ client, indexes, constraints }) => {
    if (!params.keepConstraints) {
      // We restore indexes and constraints
      console.log(`Recreating indexes`);
      await createIndexes(client, indexes);
      console.log(`Recreating constraints`);
      await createConstraints(client, constraints);
    }
    await client.release();
  },
  insert: async (client, stream, options) => {
    const insertMethod = params.bypassConflictSafeInsert
      ? fastInsert
      : conflictSafeInsert(params.conflictQuery);

    const extendedInsertMethod: InsertMethod = !params.createTemporaryFile
      ? insertMethod
      : async (client, inputStream, options) => {

        const tempFilePath = path.join(DOWNLOAD_STORAGE_PATH,`tmp-${Date.now()}`);
        await promisifyStream(inputStream.pipe(createWriteStream(tempFilePath)));

        const outputStream = createReadStream(tempFilePath);

        return insertMethod(client, outputStream, options);
      };

    return extendedInsertMethod(client, stream, options);
  }
});
