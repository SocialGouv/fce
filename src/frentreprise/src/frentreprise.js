import * as Sentry from "@sentry/node";
import InvalidIdentifierError from "./Errors/InvalidIdentifierError";
import NotFoundSourceError from "./Errors/NotFoundSourceError";
import * as Validator from "./Utils/Validator";
import ApiGouv from "./DataSources/ApiGouv";
import PG from "./DataSources/PG";
import DataSource from "./DataSources/DataSource";
import { Entreprise } from "./Entreprise";
import { Etablissement } from "./Entreprise";
import { cleanObject } from "./Utils";

const _ = {
  dataSources: Symbol("_dataSources"),
  compareDataSource: Symbol("_compareDataSource"),
  askDataSource: Symbol("_askDataSource"),
  isValidDataSources: Symbol("_isValidDataSources"),
};

class frentreprise {
  constructor() {
    this.EntrepriseModel = Entreprise;
    this.EtablissementModel = Etablissement;
    this[_.dataSources] = [];
    this.addDataSource({
      name: "ApiGouv",
      priority: 80, // higher prevail
      source: new ApiGouv("https://entreprise.api.gouv.fr:443/v2/"),
    });
    this.addDataSource({
      name: "PG",
      priority: 100, // higher prevail
      source: new PG(),
    });
  }

  initSentry(sentryUrlKey) {
    Sentry.init({
      dsn: sentryUrlKey,
    });
  }

  async getEntreprise(SiretOrSiren, dataSourceName) {
    SiretOrSiren = SiretOrSiren + "";

    const gotSIREN = Validator.validateSIREN(SiretOrSiren);
    const gotSIRET = Validator.validateSIRET(SiretOrSiren);

    if (!gotSIREN && !gotSIRET) {
      throw new InvalidIdentifierError(SiretOrSiren);
    }

    const SIREN = gotSIREN ? SiretOrSiren : SiretOrSiren.substr(0, 9);

    const entreprise = new this.EntrepriseModel(
      {
        _dataSources: {},
      },
      this.EtablissementModel
    );

    await this[_.askDataSource]("getSIREN", SIREN, dataSourceName).then(
      (result) => {
        console.log(
          `Using response from dataSource named ${result.source.name} with priority : ${result.source.priority}`
        );

        entreprise.updateData({
          ...result.data,
          _dataSources: {
            ...entreprise._dataSources,
            [result.source.name]: !!Object.keys(result.data).length, // Add current data source (true = success)
          },
        });
      }
    );

    const SIRET = gotSIRET ? SiretOrSiren : "" + entreprise.siret_siege_social;

    // We unduplicate SIRETs using a hash map
    const etablissementsLookups = Object.keys({
      [entreprise.siret_siege_social]: true,
      [SIRET]: true,
    });

    // Just wait for process to finish
    await Promise.all(
      etablissementsLookups.map((lookSIRET) => {
        if (Validator.validateSIRET(lookSIRET)) {
          return this[_.askDataSource](
            "getSIRET",
            lookSIRET,
            dataSourceName
          ).then((result) => {
            console.log(
              `Using response from dataSource named ${result.source.name} with priority : ${result.source.priority}`
            );

            const ets = entreprise.getEtablissement(lookSIRET);

            ets.updateData({
              ...result.data,
              _dataSources: {
                ...ets._dataSources,
                [result.source.name]: !!Object.keys(result.data).length, // Add current data source (true = success)
              },
            });
          });
        }
      })
    );

    entreprise.updateData({
      _success: this[_.isValidDataSources](entreprise._dataSources),
    });

    entreprise.etablissements.map((et) => {
      et.updateData({
        _success: this[_.isValidDataSources](et._dataSources),
      });
    });

    return entreprise;
  }

  getDataSources() {
    return [...this[_.dataSources]].sort(this[_.compareDataSource]);
  }

  getDataSource(name) {
    return this[_.dataSources].find((ds) => ds.name === name);
  }

  addDataSource(dataSource) {
    if (!this[_.dataSources].includes(dataSource)) {
      this[_.dataSources].push(dataSource);
    }
  }

  removeDataSource(dataSource) {
    this[_.dataSources] = this[_.dataSources].filter((ds) => ds !== dataSource);
    return;
  }

  [_.compareDataSource](a, b) {
    a = +(a && a.priority);
    b = +(b && b.priority);

    return a > b ? 1 : a < b ? -1 : 0;
  }

  [_.askDataSource](method, request, dataSourceName) {
    const dataSource = this.getDataSource(dataSourceName);

    if (!dataSource) {
      throw new NotFoundSourceError(dataSourceName);
    }

    return dataSource.source[method](request).then((response) => {
      const data =
        typeof response === "object" && response.items
          ? response.items
          : response;

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

      return { data: cleanedData, source: dataSource };
    });
  }

  [_.isValidDataSources](datasources) {
    return datasources && !!Object.values(datasources).includes(true);
  }
}

export default new frentreprise();
export { Entreprise, Etablissement, DataSource, _ };
export const isSIRET = Validator.validateSIRET;
export const isSIREN = Validator.validateSIREN;
