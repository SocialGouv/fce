const Shell = require("./Shell");
const config = require("./import/config");
const MissingConfigException = require("../Exceptions/MissingConfigException");
const IngestorBase = require("./import/Ingestor");

class IngestFileShell extends Shell {
  async execute() {
    this.checkRequiredOption("id");
    const { id, ...args } = this._options;

    if (!Object.prototype.hasOwnProperty.call(config, id)) {
      throw new MissingConfigException(id);
    }

    const ingestorConfig = config[id].ingest;
    const className = ingestorConfig.className;

    const Ingestor = className
      ? // eslint-disable-next-line security/detect-non-literal-require
        require(`./import/${className}`)
      : IngestorBase;

    const ingestor = new Ingestor(ingestorConfig, args);

    ingestor.execute();
  }
}

module.exports = IngestFileShell;
