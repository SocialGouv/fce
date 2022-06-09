import {BucketItem, Client, CopyConditions} from "minio";
import { promises as fs } from "fs";
import * as path from "path";
import { DOWNLOAD_STORAGE_PATH } from "./constants";
import {isAfter} from "date-fns";

export const getFiles = async (client: Client, bucket: string, regex: RegExp, prefix = ""): Promise<BucketItem[]> => {
  const stream = client.listObjectsV2(bucket, prefix);

  return new Promise((resolve, reject) => {
    const files: BucketItem[] = [];

    stream.on("data", (data) => {
      const verifiedName = data.name?.slice(prefix.length);
      if (verifiedName && verifiedName.match(regex)) {
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
};

export const filterOldestFile = (files: BucketItem[]): BucketItem =>
  files.reduce(
    (oldest, file) =>
      file && file.lastModified < oldest.lastModified ? file : oldest
  );

export const filterNewestFile = (files: BucketItem[]): BucketItem =>
  files.reduce(
    (newest, file) =>
      file && file.lastModified > newest.lastModified ? file : newest
  );

const exists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch(err) {
    return false;
  }
};

const createIfNotExist = async (path: string): Promise<void> => {
  if (!await exists(path)) {
    await fs.mkdir(path, { recursive: true });
  }
};

export const downloadFile = async (client: Client, bucket: string, file: BucketItem, outputFileName: string) => {
  await createIfNotExist(DOWNLOAD_STORAGE_PATH);

  try {
    await client.fGetObject(bucket, file.name, outputFileName);
  } catch (err) {
    console.error(err);
  }
};

type DownloadFileOutput = {
  outputFile: string;
  remoteFile: string;
};

type DownloadFileOptions = {
  bucket: string;
  regex: RegExp;
  outputFileName?: string;
  prefix?:string;
  lastModifiedAfterTimestamp?: number
};

export const downloadFileFromList = (selector: (fileList: BucketItem[]) => BucketItem) =>
  async (client: Client, {
    bucket,
    regex,
    outputFileName,
    prefix = "",
    lastModifiedAfterTimestamp = 0
  }: DownloadFileOptions): Promise<DownloadFileOutput> => {
    const files = await getFiles(client, bucket, regex, prefix);

    const filteredFiles = files.filter(
      ({ lastModified }) => isAfter(lastModified, lastModifiedAfterTimestamp)
    );

    if (filteredFiles.length === 0) {
      return {
        outputFile: "",
        remoteFile: ""
      };
    }

    const dowloadedFile = selector(filteredFiles);

    const outputFile = path.join(DOWNLOAD_STORAGE_PATH, outputFileName || dowloadedFile.name);

    await downloadFile(client, bucket, dowloadedFile, outputFile);

    return {
      outputFile,
      remoteFile: dowloadedFile.name
    };
};

export const downloadOldestFile = downloadFileFromList(filterOldestFile);
export const downloadNewestFile = downloadFileFromList(filterNewestFile);

export const archiveFile = async (client: Client, bucket: string, filename: string): Promise<void> => {
  const conditions = new CopyConditions();
  await client.copyObject(bucket, `archives/${filename}`, `/${bucket}/${filename}`, conditions);

  return client.removeObject(bucket, filename);
};

type ContentType = "text/csv";

export const uploadFile = async (client: Client, bucket: string, filename: string, outputFileName: string, contentType: ContentType = "text/csv"): Promise<void> => {
  const metadata = {
    "Content-Type": contentType
  };
  await client.fPutObject(bucket, outputFileName, filename, metadata);
};
