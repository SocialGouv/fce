import InvalidIdentifierError from "./Errors/InvalidIdentifierError";
import * as Validator from "./Utils/Validator";
import ApiGouv from "./DataSources/ApiGouv";

import DataSource from "./DataSources/DataSource";
import { Entreprise } from "./Entreprise";
import { Etablissement } from "./Entreprise";
import { cleanObject } from "./Utils";

const _dataSources = Symbol("_dataSources");

class frentreprise {
  constructor() {
    this.EntrepriseModel = Entreprise;
    this.EtablissementModel = Etablissement;
    this[_dataSources] = [];
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

    const entreprise = new this.EntrepriseModel(
      { _dataSources: {} },
      this.EtablissementModel
    );

    for (let i = 0; i < dataSources.length; i++) {
      const dataSource = dataSources[i].source;

      console.log(
        `Asking dataSource named ${dataSources[i].name} about SIREN : ${SIREN}`
      );
      const data = await dataSource.getSIREN(SIREN);
      const cleanedData = cleanObject(data);
      console.log(
        `Got response from dataSource named ${
          dataSources[i].name
        } about SIREN : ${SIREN}`
      );

      entreprise.updateData(cleanedData);

      entreprise.updateData({
        _dataSources: {
          ...entreprise._dataSources,
          [dataSources[i].name]: true // Add current data source
        }
      });
    }

    const SIRET = gotSIRET ? SiretOrSiren : "" + entreprise.siret_siege_social;

    const etablissementsLookup = Object.keys({
      [SIRET]: true,
      [entreprise.siret_siege_social]: true
    });

    for (let i = 0; i < etablissementsLookup.length; i++) {
      const lookSIRET = etablissementsLookup[i];
      if (Validator.validateSIRET(lookSIRET)) {
        let etsData = { _dataSources: {} };

        for (let i = 0; i < dataSources.length; i++) {
          const dataSource = dataSources[i].source;

          console.log(
            `Asking dataSource named ${
              dataSources[i].name
            } about SIRET : ${lookSIRET}`
          );
          const data = await dataSource.getSIRET(lookSIRET);
          const cleanedData = cleanObject(data);
          console.log(
            `Got response from dataSource named ${
              dataSources[i].name
            } about SIRET : ${lookSIRET}`
          );

          entreprise.getEtablissement(lookSIRET).updateData(cleanedData);

          entreprise.getEtablissement(lookSIRET).updateData({
            _dataSources: {
              ...entreprise._dataSources,
              [dataSources[i].name]: true // Add current data source
            }
          });
        }
      }
    }

    return entreprise;
  }

  async search(query) {
    const dataSources = this.getDataSources();
    const results = {};

    for (let i = 0; i < dataSources.length; i++) {
      const dataSource = dataSources[i].source;
      const sourceName = dataSources[i].name;

      console.log(
        `Searching dataSource named ${sourceName} with query: `,
        query
      );

      const source_results = await dataSource.search(query);

      if (source_results === false) {
        console.log(
          `Source named ${sourceName} doesn't support search. (it returned false)`
        );
        continue;
      }

      if (!Array.isArray(source_results)) {
        console.error(
          `Source named ${sourceName} returned invalid data for search, array expected. Received:`,
          source_results
        );
        continue;
      }

      console.log(
        `Got response from dataSource named ${sourceName} about query: `,
        query
      );

      source_results.forEach(result => {
        const SIREN =
          (Validator.validateSIREN(result.siren) && result.siren) ||
          result.siret.substr(0, 9);
        const SIRET = Validator.validateSIRET(result.siret) && result.siret;

        if (Validator.validateSIREN(SIREN)) {
          if (!results[SIREN]) {
            results[SIREN] = new this.EntrepriseModel(
              { siren: SIREN, _dataSources: {} },
              this.EtablissementModel
            );
          }

          if (SIRET) {
            results[SIREN].getEtablissement(SIRET).updateData(
              cleanObject(result)
            );
            results[SIREN].getEtablissement(SIRET).updateData({
              _dataSources: {
                ...results[SIREN].getEtablissement(SIRET)._dataSources,
                [sourceName]: true
              }
            });
          } else {
            results[SIREN].updateData(cleanObject(result));
          }
        }
      });
    }

    return Object.values(results);
  }

  getDataSources() {
    return [...this[_dataSources]].sort((a, b) => {
      a = +(a && a.priority);
      b = +(b && b.priority);

      return a > b ? 1 : a < b ? -1 : 0;
    });
  }

  getDataSource(name) {
    return this[_dataSources].find(ds => ds.name === name);
  }

  addDataSource(dataSource) {
    if (!this[_dataSources].includes(dataSource)) {
      this[_dataSources].push(dataSource);
    }
  }

  removeDataSource(dataSource) {
    this[_dataSources].slice(this[_dataSources].indexOf(dataSource), 1);
  }
}

module.exports = new frentreprise();
module.exports.Entreprise = Entreprise;
module.exports.Etablissement = Etablissement;
module.exports.DataSource = DataSource;
module.exports.isSIRET = Validator.validateSIRET;
module.exports.isSIREN = Validator.validateSIREN;
