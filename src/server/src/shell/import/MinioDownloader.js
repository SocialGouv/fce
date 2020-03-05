require("dotenv").config();
const process = require("process");
const Minio = require("minio");

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

    console.log(this.minioClient);
  }
}

module.exports = MinioDownloader;
