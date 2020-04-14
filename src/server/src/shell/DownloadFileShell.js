const Shell = require("./Shell");
const config = require("./import/config");
const MissingConfigException = require("../Exceptions/MissingConfigException");
const MinioDownloader = require("./import/MinioDownloader");

class DownloadFileShell extends Shell {
  async execute() {
    this.checkRequiredOption("id");
    const id = this._options.id;

    if (!Object.prototype.hasOwnProperty.call(config, id)) {
      throw new MissingConfigException(id);
    }

    const archiveFile = Boolean(+this.getEnvConfig("MINIO_ARCHIVE_FILES"));

    const downloadConfig = config[id].download;
    downloadConfig.archiveFile = archiveFile;
    const className = downloadConfig.className;

    const Downloader = className
      ? // eslint-disable-next-line security/detect-non-literal-require
        require(`./import/${className}`)
      : MinioDownloader;

    const downloader = new Downloader(downloadConfig);

    downloader.execute();
  }
}

module.exports = DownloadFileShell;
