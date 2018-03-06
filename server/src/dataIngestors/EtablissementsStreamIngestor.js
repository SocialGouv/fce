const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");

const ObjectManipulations = require("../utils/ObjectManipulations");

const Etablissement = require("../models/EtablissementModel");
const CommunesIngestor = require("./CommunesIngestor");
const DepartementsIngestor = require("./DepartementsIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");
var csv = require("fast-csv");
// var CsvReader = require("promised-csv");
const readline = require("readline");
const Queue = require("promise-queue");

class EtablissementsStreamIngestor extends Ingestor {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.Model = Etablissement;
    this.bufferItems = [];
    this.nbItemsSaved = 0;
    this.promiseQueue = new Queue(50, Infinity);
    this.intervalId = null;
  }

  saveEntities() {
    let entities = { communes: [], codesPostaux: [], departements: [] };
    const etablissements = this.getEtablissements();
    const communesIngestor = new CommunesIngestor();
    const departementsIngestor = new DepartementsIngestor();
    const codesPostauxIngestor = new CodesPostauxIngestor();

    return communesIngestor
      .save(etablissements)
      .then(data => {
        entities.communes = data;
        return departementsIngestor.save(etablissements);
      })
      .then(data => {
        entities.departements = data;
        return codesPostauxIngestor.save(etablissements);
      })
      .then(data => {
        entities.codesPostaux = data;
        return entities;
      });
  }

  flushBuffer(force) {
    const length = this.bufferItems.length;
    if (length >= 10000 || force) {
      const items = [...this.bufferItems];
      this.promiseQueue.add(() => {
        return this.Model.insertMany(items).then(() => {
          this.nbItemsSaved += items.length;
        });
      });

      this.bufferItems = [];
    }
  }

  save(shouldSaveEntities) {
    const promise = new Promise((resolve, reject) => {
      let index = 0;
      csv
        .fromPath(this.filePath, { headers: true })
        .on(
          "data",
          function(data) {
            let keys = Object.keys(data);
            let item = {};
            item = keys.reduce((acc, key) => {
              acc[key.toLowerCase()] = data[key];
              return acc;
            }, {});
            ObjectManipulations.clean(item);

            this.bufferItems.push(item);
            this.flushBuffer();
            index++;
          }.bind(this)
        )
        .on(
          "end",
          function() {
            this.flushBuffer(true);

            this.intervalId = setInterval(() => {
              if (
                this.promiseQueue.getQueueLength() === 0 &&
                this.promiseQueue.getPendingLength() === 0
              ) {
                const responseData = {
                  nb: index,
                  nbItemsSaved: this.nbItemsSaved
                };

                resolve(responseData);
                clearInterval(this.intervalId);
              }
            }, 600);
          }.bind(this)
        );
    });
    return promise;
  }

  resetEntities() {
    let entities = { communes: {}, codesPostaux: {}, departements: {} };
    const communesIngestor = new CommunesIngestor();
    const departementsIngestor = new DepartementsIngestor();
    const codesPostauxIngestor = new CodesPostauxIngestor();

    return communesIngestor
      .reset()
      .then(data => {
        entities.communes = data;
        return departementsIngestor.reset();
      })
      .then(data => {
        entities.departements = data;
        return codesPostauxIngestor.reset();
      })
      .then(data => {
        entities.codesPostaux = data;

        return entities;
      });
  }

  reset(params) {
    if (params && params.shouldResetEntities) {
      let responseData = { etablissements: {}, entities: {} };
      return super
        .reset()
        .then(data => {
          responseData.etablissements = data;
          return this.resetEntities();
        })
        .then(data => {
          responseData.entities = data;
          return responseData;
        });
    } else {
      return super.reset();
    }
  }
}

module.exports = EtablissementsStreamIngestor;
