require("dotenv").config();
const process = require("process");
const { format } = require("date-fns");
const Minio = require("minio");

const LOCAL_STORAGE_PATH = "/mnt/data/export";
const ARCHIVE_FOLDER = "archives";

class MinioDownloader {
  constructor(config) {
    this._config = config;

    const {
      MINIO_ENDPOINT,
      MINIO_PORT,
      MINIO_USE_SSL,
      MINIO_ACCESS_KEY,
      MINIO_SECRET_KEY
    } = process.env;

    this.minioClient = new Minio.Client({
      endPoint: MINIO_ENDPOINT,
      port: +MINIO_PORT,
      useSSL: !!MINIO_USE_SSL,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY
    });
  }

  async execute() {
    console.log("Execute Downloader");
    const { bucket, fileMatch, converter } = this._config;

    const file = await this._getOldestFile(bucket, fileMatch);

    if (!file) {
      console.log("No file to download");
      return;
    }

    await this._downloadFile(bucket, file);

    if (converter) {
      await this._convertFile(converter);
    }

    if (this._config.archiveFile) {
      await this._moveToArchive(bucket, file);
    }

    console.log("File downloaded");
  }

  async _getOldestFile(bucket, fileMatch) {
    const files = await this._getFiles(bucket, fileMatch);

    return files.reduce((oldestFile, file) => {
      if (!oldestFile) {
        return file;
      }

      if (file.lastModified < oldestFile.lastModified) {
        return file;
      }

      return oldestFile;
    }, null);
  }

  async _getFiles(bucket, fileMatch) {
    const stream = this.minioClient.listObjectsV2(bucket);

    return new Promise((resolve, reject) => {
      const files = [];
      stream.on("data", obj => {
        if (obj.name && obj.name.match(fileMatch)) {
          files.push(obj);
        }
        resolve(files);
      });
      stream.on("error", err => {
        console.error(err);
        reject(err);
      });
    });
  }

  async _downloadFile(bucket, file) {
    const { outputFileName } = this._config;
    const filePath = `${LOCAL_STORAGE_PATH}/${outputFileName}`;
    return new Promise((resolve, reject) => {
      this.minioClient.fGetObject(bucket, file.name, filePath, err => {
        if (err) {
          return reject(err);
        }
        return resolve({ success: true, filePath });
      });
    });
  }

  async _convertFile(converterFile) {
    const { outputFileName } = this._config;
    const filePath = `${LOCAL_STORAGE_PATH}/${outputFileName}`;

    // eslint-disable-next-line security/detect-non-literal-require
    const converter = require(`./converter/${converterFile}`);
    return await converter(filePath);
  }

  async _moveToArchive(bucket, file) {
    await this._copyToArchive(bucket, file);
    await this._removeToRoot(bucket, file);
    return true;
  }

  async _copyToArchive(bucket, file) {
    return new Promise((resolve, reject) => {
      this.minioClient.copyObject(
        bucket,
        `${ARCHIVE_FOLDER}/${format(new Date(), "yyyyMMdd_HHmmss")}_${
          file.name
        }`,
        `${bucket}/${file.name}`,
        null,
        (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      );
    });
  }

  async _removeToRoot(bucket, file) {
    return new Promise((resolve, reject) => {
      this.minioClient.removeObject(bucket, file.name, err => {
        if (err) {
          return reject(err);
        }
        return resolve({ success: true });
      });
    });
  }
}

module.exports = MinioDownloader;
