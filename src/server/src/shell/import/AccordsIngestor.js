const Ingestor = require("./Ingestor");
// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

class AccordsIngestor extends Ingestor {}

module.exports = AccordsIngestor;
