require("dotenv").config();
const process = require("process");
const fs = require("fs");
const Minio = require("minio");

const LOCAL_STORAGE_PATH = "/mnt/data/export";

class MinioUploader {
  constructor(config) {
    this._config = config;

    const {
      MINIO_ENDPOINT,
      MINIO_PORT,
      MINIO_USE_SSL,
      MINIO_ACCESS_KEY,
      MINIO_SECRET_KEY,
    } = process.env;

    this.minioClient = new Minio.Client({
      endPoint: MINIO_ENDPOINT,
      port: +MINIO_PORT,
      useSSL: !!MINIO_USE_SSL,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
  }

  async execute() {
    console.log("Execute Uploader");
    const { bucket, pathInBucket, fileMatch } = this._config;

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.promises
      .readdir(LOCAL_STORAGE_PATH)
      .then(async (filenames) => {
        const fileName = filenames.find((file) => file.match(fileMatch));

        if (!fileName) {
          throw new Error("No file found, upload failed.");
        }

        console.log("File found: ", fileName);

        await this._uploadFile(bucket, pathInBucket, fileName);
        await this._deleteUploadedFileFromDisk(fileName);

        console.log("File uploaded");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async _uploadFile(bucket, pathInBucket, fileName) {
    const filePath = `${LOCAL_STORAGE_PATH}/${fileName}`;
    return new Promise((resolve, reject) => {
      this.minioClient.fPutObject(
        bucket,
        `${pathInBucket}${fileName}`,
        filePath,
        (err) => {
          if (err) {
            return reject(err);
          }
          return resolve({ success: true, filePath });
        }
      );
    });
  }

  async _deleteUploadedFileFromDisk(fileName) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.unlink(`${LOCAL_STORAGE_PATH}/${fileName}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`The file ${fileName} was successfully removed.`);
    });
  }
}

module.exports = MinioUploader;
