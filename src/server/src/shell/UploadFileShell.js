const Shell = require("./Shell");
const config = require("./export/config");
const MissingConfigException = require("../Exceptions/MissingConfigException");
const MinioUploader = require("./export/MinioUploader");

class UploadFileShell extends Shell {
  async execute() {
    this.checkRequiredOption("id");
    const id = this._options.id;

    if (!Object.prototype.hasOwnProperty.call(config, id)) {
      throw new MissingConfigException(id);
    }

    const uploadConfig = config[id].upload;
    const className = uploadConfig.className;

    const Uploader = className
      ? // eslint-disable-next-line security/detect-non-literal-require
        require(`./export/${className}`)
      : MinioUploader;

    const uploader = new Uploader(uploadConfig);

    uploader.execute();
  }
}

module.exports = UploadFileShell;
