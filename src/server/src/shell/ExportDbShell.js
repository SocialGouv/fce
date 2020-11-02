const Shell = require("./Shell");
const config = require("./export/config");
const MissingConfigException = require("../Exceptions/MissingConfigException");
const ExporterBase = require("./export/Exporter");

class ExportDbShell extends Shell {
  async execute() {
    this.checkRequiredOption("id");
    const id = this._options.id;

    if (!Object.prototype.hasOwnProperty.call(config, id)) {
      throw new MissingConfigException(id);
    }

    const exporterConfig = config[id].export;
    const className = exporterConfig.className;

    const Exporter = className
      ? // eslint-disable-next-line security/detect-non-literal-require
        require(`./export/${className}`)
      : ExporterBase;

    const exporter = new Exporter(exporterConfig);

    exporter.execute();
  }
}

module.exports = ExportDbShell;
