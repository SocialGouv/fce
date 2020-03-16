const Shell = require("./Shell");
const config = require("./import/config");
const MissingConfigException = require("../Exceptions/MissingConfigException");
const IngestorBase = require("./import/Ingestor");

class IngestFileShell extends Shell {
  async execute() {
    this.checkRequiredOption("id");
    const id = this._options.id;

    if (!config.hasOwnProperty(id)) {
      throw new MissingConfigException(id);
    }

    const ingestorConfig = config[id].ingest;
    const className = ingestorConfig.className;

    const Ingestor = className
      ? require(`./import/${className}`)
      : IngestorBase;

    const ingestor = new Ingestor(ingestorConfig);

    ingestor.execute();
  }
}

module.exports = IngestFileShell;
