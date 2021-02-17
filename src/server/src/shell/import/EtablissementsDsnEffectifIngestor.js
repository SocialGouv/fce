const Ingestor = require("./Ingestor");

class EtablissementsDsnEffectifIngestor extends Ingestor {
  /**
   * Remove duplicate content and breaklines for inspecteurs
   */
  async afterPsqlCopy() {}
}

module.exports = EtablissementsDsnEffectifIngestor;
