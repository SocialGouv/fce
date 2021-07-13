import { BucketItem, Client } from "minio";
import { promises as fs } from "fs";
import * as path from "path";
import { DOWNLOAD_STORAGE_PATH } from "./constants";

export const getFiles = async (client: Client, bucket: string, regex: RegExp): Promise<BucketItem[]> => {
  const stream = client.listObjectsV2(bucket);

  return new Promise((resolve, reject) => {
    const files: BucketItem[] = [];

    stream.on("data", (data) => {
      if (data.name && data.name.match(regex)) {
        files.push(data);
      }
    });

    stream.on("error", (error) => {
      console.error("error", error);
    });

    stream.on("end", () => {
      resolve(files);
    });
  });
}

export const filterOldestFile = (files: BucketItem[]): BucketItem =>
  files.reduce(
    (oldest, file) =>
      file && file.lastModified < oldest.lastModified ? file : oldest
  );

const exists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch(err) {
    return false;
  }
}

const createIfNotExist = async (path: string): Promise<void> => {
  if (!await exists(path)) {
    await fs.mkdir(path, { recursive: true });
  }
}

export const downloadFile = async (client: Client, bucket: string, file: BucketItem, outputFileName: string) => {
  await createIfNotExist(DOWNLOAD_STORAGE_PATH);

  try {
    await client.fGetObject(bucket, file.name, outputFileName);
  } catch (err) {
    console.error(err);
  }
}

export const downloadOldestFile = async (client: Client, bucket: string, regex: RegExp, outputFileName: string) => {
  const files = await getFiles(client, bucket, regex);

  if (files.length === 0) {
    return "";
  }
  const oldestFile = filterOldestFile(files);

  const outputFile = path.join(DOWNLOAD_STORAGE_PATH, outputFileName);

  await downloadFile(client, bucket, oldestFile, outputFile);

  return outputFile;
}

