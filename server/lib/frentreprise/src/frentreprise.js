import InvalidIdentifierError from "~/Errors/InvalidIdentifierError";
import * as Validator from "~/Utils/Validator";
import ApiGouv from "~/DataSources/ApiGouv";

import Entreprise from "~/Entreprise";
import Etablissement from "~/Entreprise";

class frentreprise {
  constructor() {
    this.EntrepriseModel = Entreprise;
    this.EtablissementModel = Etablissement;
    this.dataSources = [];
    this.addDataSource({
      name: "ApiGouv",
      priority: 100, // higher prevail
      source: new ApiGouv("https://entreprise.api.gouv.fr/v2/")
    });
  }

  async getEntreprise(SiretOrSiren) {
    SiretOrSiren = SiretOrSiren + "";

    const gotSIREN = Validator.validateSIREN(SiretOrSiren);
    const gotSIRET = Validator.validateSIRET(SiretOrSiren);

    if (!gotSIREN && !gotSIRET) {
      throw new InvalidIdentifierError(SiretOrSiren);
    }

    const SIREN = gotSIREN ? SiretOrSiren : SiretOrSiren.substr(0, 9);

    const dataSources = this.getDataSources();

    let etData = {};

    for (let i = 0; i < this.dataSources.length; i++) {
      const dataSource = this.dataSources[i].source;
      etData = {
        ...etData,
        ...(await dataSource.getSIREN(SIREN))
      };
    }

    const entreprise = new this.EntrepriseModel(etData);

    if (gotSIRET) {
      let etsData = {};

      for (let i = 0; i < this.dataSources.length; i++) {
        const dataSource = this.dataSources[i].source;
        etsData = {
          ...etsData,
          ...(await dataSource.getSIRET(SiretOrSiren))
        };
      }

      entreprise.importEtablissement(new this.EtablissementModel(etsData));
    }

    return entreprise;
  }

  search() {
    return [];
  }

  getDataSources() {
    return [...this.dataSources].sort((a, b) => {
      a = +(a && a.priority);
      b = +(b && b.priority);

      return a > b ? 1 : a < b ? -1 : 0;
    });
  }

  getDataSource(name) {
    return this.dataSources.find(ds => ds.name === name);
  }

  addDataSource(dataSource) {
    if (!this.dataSources.includes(dataSource)) {
      this.dataSources.push(dataSource);
    }
  }

  removeDataSource(dataSource) {
    this.dataSources.slice(this.dataSources.indexOf(dataSource), 1);
  }
}

module.exports = new frentreprise();
module.exports.Entreprise = Entreprise;
module.exports.Etablissement = Etablissement;
