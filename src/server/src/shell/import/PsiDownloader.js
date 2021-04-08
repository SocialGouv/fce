const { writeFile } = require("fs").promises;
const MinioDownloader = require("./MinioDownloader");

const LOCAL_STORAGE_PATH = "/mnt/data/export";

class PsiCurrentYearDownloader extends MinioDownloader {
  async _downloadFile(bucket, file) {
    const { writeUpdateDateToFile, outputFileName } = this._config;

    if (writeUpdateDateToFile) {
      const [filename] = file.name.split(".");
      const [, , , lastUpdate] = filename.split("-");
      const formatedLastUpdate = [
        lastUpdate.slice(4),
        lastUpdate.slice(2, 4),
        lastUpdate.slice(0, 2),
      ].join("-");

      const lastUpdateFile = `${LOCAL_STORAGE_PATH}/psi-last-update.txt`;

      writeFile(`${lastUpdateFile}`, `${formatedLastUpdate}`)
        .then(() => {
          console.log(`Last update date written to file: psi-last-update.txt`);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    const filePath = `${LOCAL_STORAGE_PATH}/${outputFileName}`;
    return new Promise((resolve, reject) => {
      this.minioClient.fGetObject(bucket, file.name, filePath, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve({ success: true, filePath });
      });
    });
  }
}

module.exports = PsiCurrentYearDownloader;
