const csv = require("fast-csv");
const Queue = require("promise-queue");

const Ingestor = require("./Ingestor");
const ObjectManipulations = require("../utils/ObjectManipulations");

const Etablissement = require("../models/EtablissementModel");
const CommunesIngestor = require("./CommunesIngestor");
const DepartementsIngestor = require("./DepartementsIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");

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
    const communesIngestor = new CommunesIngestor();
    const departementsIngestor = new DepartementsIngestor();
    const codesPostauxIngestor = new CodesPostauxIngestor();

    const saveParams = {
      mongo: true
    };
    return communesIngestor
      .save(saveParams)
      .then(data => {
        entities.communes = data[0];
        return departementsIngestor.save(saveParams);
      })
      .then(data => {
        entities.departements = data[0];
        return codesPostauxIngestor.save(saveParams);
      })
      .then(data => {
        entities.codesPostaux = data[0];
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

  save(params) {
    const promise = new Promise((resolve, reject) => {
      let index = 0;
      csv
        .fromPath(this.filePath, { headers: true })
        .on("data", data => {
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
        })
        .on("end", () => {
          this.flushBuffer(true);

          this.intervalId = setInterval(() => {
            if (
              this.promiseQueue.getQueueLength() === 0 &&
              this.promiseQueue.getPendingLength() === 0
            ) {
              let responseData = {
                nb: index,
                nbItemsSaved: this.nbItemsSaved
              };
              if (params && params.shouldSaveEntities) {
                this.saveEntities()
                  .then(data => {
                    responseData.entities = data;
                    resolve(responseData);
                  })
                  .catch(err => {
                    reject(err);
                  });
              } else {
                resolve(responseData);
              }
              clearInterval(this.intervalId);
            }
          }, 600);
        });
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
