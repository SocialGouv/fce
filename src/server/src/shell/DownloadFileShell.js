const Shell = require("./Shell");
const config = require("../../config/import");
const MissingConfigException = require("../Exceptions/MissingConfigException");
const MinioDownloader = require("./import/MinioDownloader");

class DownloadFileShell extends Shell {
  async execute() {
    this.checkRequiredOption("id");
    const id = this._options.id;

    if (!config.hasOwnProperty(id)) {
      throw new MissingConfigException(id);
    }

    const downloadConfig = config[id].download;
    const className = downloadConfig.className;

    const Downloader = className
      ? require(`./import/${className}`)
      : MinioDownloader;

    const downloader = new Downloader(downloadConfig);

    downloader.execute();
  }
}

export default DownloadFileShell;
