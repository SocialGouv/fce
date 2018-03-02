import InvalidIdentifierError from "./Errors/InvalidIdentifierError";
import * as Validator from "./Utils/Validator";
import ApiGouv from "./DataSources/ApiGouv";

import DataSource from "./DataSources/DataSource";
import Entreprise from "./Entreprise";
import Etablissement from "./Entreprise";

const _dataSources = Symbol("_dataSources");
const _cleanObject = Symbol("_cleanObject");

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

    let etData = { _dataSources: {} };

    for (let i = 0; i < dataSources.length; i++) {
      const dataSource = dataSources[i].source;

      etData = {
        ...etData,
        ...this[_cleanObject](await dataSource.getSIREN(SIREN))
      };

      etData._dataSources[dataSources[i].name] = true;
    }

    const entreprise = new this.EntrepriseModel(etData);

    const SIRET = gotSIRET ? SiretOrSiren : "" + entreprise.siret_siege_social;

    if (Validator.validateSIRET(SIRET)) {
      let etsData = { _dataSources: {} };

      for (let i = 0; i < dataSources.length; i++) {
        const dataSource = dataSources[i].source;

        etsData = {
          ...etsData,
          ...this[_cleanObject](await dataSource.getSIRET(SIRET))
        };

        etsData._dataSources[dataSources[i].name] = true;
      }

      entreprise.importEtablissement(new this.EtablissementModel(etsData));
    }

    return entreprise;
  }

  async search(query) {
    const dataSources = this.getDataSources();
    const results = {};

    for (let i = 0; i < dataSources.length; i++) {
      const dataSource = dataSources[i].source;
      const sourceName = dataSources[i].name;

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

      source_results.forEach(result => {
        const SIREN =
          (Validator.validateSIREN(result.siren) && result.siren) ||
          result.siret.substr(0, 9);
        const SIRET = Validator.validateSIRET(result.siret) && result.siret;

        if (Validator.validateSIREN(SIREN)) {
          if (!results[SIREN]) {
            results[SIREN] = { siren: SIREN, _dataSources: {} };
          }

          if (SIRET) {
            // ETABLISSEMENT
            if (!Array.isArray(results[SIREN].etablissements)) {
              results[SIREN].etablissements = {};
            }

            results[SIREN].etablissements[SIRET] = {
              ...(results[SIREN].etablissements[SIRET] || { _dataSources: {} }),
              ...this[_cleanObject](result)
            };

            results[SIREN].etablissements[SIRET]._dataSources[
              sourceName
            ] = true;
          } else {
            // ENTREPRISE
            // Support arrays, who knows why
            if (Array.isArray(result.etablissements)) {
              result.etablissements = result.etablissements.reduce(
                (map, et) => {
                  if (Validator.validateSIRET(et.siret)) {
                    map[et.siret] = et;
                  }
                },
                {}
              );
            }

            // Merge-copy etablissements first
            if (!results[SIREN].etablissements) {
              results[SIREN].etablissements = {};
            }

            Object.keys(result.etablissements || {}).forEach(siret => {
              results[SIREN].etablissements[siret] = {
                ...(results[SIREN].etablissements[siret] || {
                  _dataSources: {}
                }),
                ...this[_cleanObject](result.etablissements[siret])
              };

              results[SIREN].etablissements[siret]._dataSources[
                sourceName
              ] = true;
            });

            delete result.etablissements; // We already copied them

            results[SIREN] = {
              ...results[SIREN],
              ...this[_cleanObject](result)
            };

            results[SIREN]._dataSources[sourceName] = true;
          }
        }
      });
    }

    const results_final = Object.values(results).map(etData => {
      const etablissements = Object.values(etData.etablissements);
      delete etData.etablissements;

      const ent = new this.EntrepriseModel(etData);
      etablissements.forEach(etsData => {
        ent.importEtablissement(new this.EtablissementModel(etsData));
      });

      return ent;
    });

    console.log(results_final);
    return results_final;
  }

  [_cleanObject](object) {
    Object.keys(object || {}).forEach(key => {
      if (object[key] === null || typeof object[key] === "undefined") {
        delete object[key];
      }
    });
    return object;
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
