import InvalidIdentifierError from "./Errors/InvalidIdentifierError";
import * as Validator from "./Utils/Validator";
import ApiGouv from "./DataSources/ApiGouv";
import SirenePG from "./DataSources/SirenePG";
import SireneAPI from "./DataSources/SireneAPI";

import DataSource from "./DataSources/DataSource";
import { Entreprise } from "./Entreprise";
import { Etablissement } from "./Entreprise";
import { cleanObject } from "./Utils";

const _ = {
  dataSources: Symbol("_dataSources"),
  compareDataSource: Symbol("_compareDataSource"),
  askDataSource: Symbol("_askDataSource"),
  isValidDataSources: Symbol("_isValidDataSources")
};

class frentreprise {
  constructor() {
    this.EntrepriseModel = Entreprise;
    this.EtablissementModel = Etablissement;
    this[_.dataSources] = [];
    this.addDataSource({
      name: "ApiGouv",
      priority: 80, // higher prevail
      source: new ApiGouv("https://entreprise.api.gouv.fr:443/v2/")
    });
    this.addDataSource({
      name: "SirenePG",
      priority: 100, // higher prevail
      source: new SirenePG(),
      pagination: {
        itemsByPage: 25
      }
    });
  }

  setDb(db) {
    this.db = db;
  }

  async getEntreprise(SiretOrSiren) {
    SiretOrSiren = SiretOrSiren + "";

    const gotSIREN = Validator.validateSIREN(SiretOrSiren);
    const gotSIRET = Validator.validateSIRET(SiretOrSiren);

    if (!gotSIREN && !gotSIRET) {
      throw new InvalidIdentifierError(SiretOrSiren);
    }

    const SIREN = gotSIREN ? SiretOrSiren : SiretOrSiren.substr(0, 9);

    const entreprise = new this.EntrepriseModel(
      {
        _dataSources: {}
      },
      this.EtablissementModel
    );

    await this[_.askDataSource]("getSIREN", SIREN, null, result => {
      console.log(
        `Using response from dataSource named ${result.source.name} with priority : ${result.source.priority}`
      );

      entreprise.updateData({
        ...result.data,
        _dataSources: {
          ...entreprise._dataSources,
          [result.source.name]: !!Object.keys(result.data).length // Add current data source (true = success)
        }
      });
    });

    const SIRET = gotSIRET ? SiretOrSiren : "" + entreprise.siret_siege_social;

    // We unduplicate SIRETs using a hash map
    const etablissementsLookups = Object.keys({
      [entreprise.siret_siege_social]: true,
      [SIRET]: true
    });

    // Just wait for process to finish
    await Promise.all(
      etablissementsLookups.map(lookSIRET => {
        if (Validator.validateSIRET(lookSIRET)) {
          return this[_.askDataSource]("getSIRET", lookSIRET, null, result => {
            console.log(
              `Using response from dataSource named ${result.source.name} with priority : ${result.source.priority}`
            );

            const ets = entreprise.getEtablissement(lookSIRET);

            ets.updateData({
              ...result.data,
              _dataSources: {
                ...ets._dataSources,
                [result.source.name]: !!Object.keys(result.data).length // Add current data source (true = success)
              }
            });
          });
        }
      })
    );

    entreprise.updateData({
      _success: this[_.isValidDataSources](entreprise._dataSources)
    });

    entreprise.etablissements.map(et => {
      et.updateData({
        _success: this[_.isValidDataSources](et._dataSources)
      });
    });

    return entreprise;
  }

  async search(terms, page = 1) {
    const results = {};
    let hasError = false;
    let pagination = null;

    await this[_.askDataSource]("search", terms, page, searchResult => {
      const { data: source_results } = searchResult;
      pagination = searchResult.pagination;

      if (source_results === false) {
        console.log(
          `Source named ${searchResult.source.name} doesn't support search. (it returned false)`
        );
      } else if (!Array.isArray(source_results)) {
        if (
          typeof source_results === "object" &&
          source_results.hasOwnProperty("error") &&
          source_results.error === true
        ) {
          hasError = true;
        }
        console.error(
          `Source named ${searchResult.source.name} returned invalid data for search, array expected. Received:`,
          source_results
        );
      } else {
        console.log(
          `Using response from dataSource named ${searchResult.source.name} with priority : ${searchResult.source.priority}`
        );

        source_results.forEach(result => {
          const SIREN =
            (Validator.validateSIREN(result.siren) && result.siren) ||
            result.siret.substr(0, 9);
          const SIRET = Validator.validateSIRET(result.siret) && result.siret;

          if (Validator.validateSIREN(SIREN)) {
            if (!results[SIREN]) {
              results[SIREN] = new this.EntrepriseModel(
                {
                  siren: SIREN,
                  _dataSources: {}
                },
                this.EtablissementModel
              );
            }

            if (SIRET) {
              results[SIREN].getEtablissement(SIRET).updateData({
                ...cleanObject(result),
                _dataSources: {
                  ...results[SIREN].getEtablissement(SIRET)._dataSources,
                  [searchResult.source.name]: true
                }
              });
            } else {
              results[SIREN].updateData(cleanObject(result));
            }
          }
        });
      }
    });

    let resultsValues = Object.values(results);

    return !resultsValues.length && hasError
      ? false
      : { items: resultsValues, pagination };
  }

  getDataSources() {
    return [...this[_.dataSources]].sort(this[_.compareDataSource]);
  }

  getDataSource(name) {
    return this[_.dataSources].find(ds => ds.name === name);
  }

  addDataSource(dataSource) {
    if (!this[_.dataSources].includes(dataSource)) {
      this[_.dataSources].push(dataSource);
    }
  }

  removeDataSource(dataSource) {
    this[_.dataSources] = this[_.dataSources].filter(ds => ds !== dataSource);
    return;
  }

  [_.compareDataSource](a, b) {
    a = +(a && a.priority);
    b = +(b && b.priority);

    return a > b ? 1 : a < b ? -1 : 0;
  }

  [_.askDataSource](method, request, page, forEach = result => result) {
    return Promise.all(
      this.getDataSources().map(dataSource => {
        console.log(
          `Asking [${method}] to dataSource named ${
            dataSource.name
          } with request : ${JSON.stringify(request)}`
        );

        const pagination =
          page && dataSource.pagination
            ? {
                ...dataSource.pagination,
                page
              }
            : null;

        if (this.db) {
          dataSource.source.setDb(this.db);
        }

        return dataSource.source[method](request, pagination).then(response => {
          const data =
            typeof response === "object" && response.items
              ? response.items
              : response;
          const paginationResponse =
            pagination && typeof response === "object" && response.pagination
              ? response.pagination
              : {};

          const cleanedData =
            typeof data === "object"
              ? Array.isArray(data)
                ? data.map(cleanObject)
                : cleanObject(data)
              : data;
          console.log(
            `Got response for [${method}] from dataSource named ${
              dataSource.name
            } about request : ${JSON.stringify(request)}`
          );

          return Promise.resolve({
            source: dataSource,
            data: cleanedData,
            pagination: paginationResponse
          });
        });
      })
    ).then(results => {
      results
        .sort(
          (a, b) =>
            (a.source && b.source && this[_.compareDataSource](a, b)) || 0
        )
        .map(forEach);
    });
  }

  [_.isValidDataSources](datasources) {
    return datasources && !!Object.values(datasources).includes(true);
  }
}
/*
module.exports = new frentreprise();
module.exports.Entreprise = Entreprise;
module.exports.Etablissement = Etablissement;
module.exports.DataSource = DataSource;
module.exports.isSIRET = Validator.validateSIRET;
module.exports.isSIREN = Validator.validateSIREN;
module.exports._ = _;
*/

export default new frentreprise();
export { Entreprise, Etablissement, DataSource, _ };
export const isSIRET = Validator.validateSIRET;
export const isSIREN = Validator.validateSIREN;
