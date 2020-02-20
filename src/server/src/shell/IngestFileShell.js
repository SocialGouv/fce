const Shell = require("./Shell");
const config = require("../../config/import");
const MissingConfigException = require("../Exceptions/MissingConfigException");
const Ingestor = require(`./import/Ingestor`);

class IngestFileShell extends Shell {
  async execute() {
    this.checkRequiredOption("id");
    const id = this._options.id;

    if (!config.hasOwnProperty(id)) {
      throw new MissingConfigException(id);
    }

    const ingestorConfig = config[id].ingest;
    const ingestor = new Ingestor(ingestorConfig);

    ingestor.execute();
  }
}

module.exports = IngestFileShell;
