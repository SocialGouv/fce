const Ingestor = require("./Ingestor");

class InteractionsPoleTIngestor extends Ingestor {
  afterPsqlCopy() {
    console.log("afterPsqlCopy");
  }
}

module.exports = InteractionsPoleTIngestor;
