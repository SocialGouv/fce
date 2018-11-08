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
    console.log(
      "[EtablissementsStreamIngestor] Instantiated with filepath",
      filePath
    );
    this.filePath = filePath;
    this.Model = Etablissement;
    this.bufferItems = [];
    this.nbItemsSaved = 0;
    this.nbItemsToSave = 0;
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
    console.log("[EtablissementsStreamIngestor] Saving communes");
    return communesIngestor
      .save(saveParams)
      .then(data => {
        entities.communes = data[0];
        console.log("[EtablissementsStreamIngestor] Saving departements");

        return departementsIngestor.save(saveParams);
      })
      .then(data => {
        entities.departements = data[0];
        console.log("[EtablissementsStreamIngestor] Saving code postaux");
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
      this.nbItemsToSave = this.nbItemsToSave + length;
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
    console.log("[EtablissementsStreamIngestor] Starting ingestion");
    const promise = new Promise((resolve, reject) => {
      let index = 0;
      console.log(
        "[EtablissementsStreamIngestor] Opening file : " + this.filePath
      );
      this.nbItemsToSave = 0;
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
          if (index < 2) console.log(item);
        })
        .on("end", () => {
          console.log("[EtablissementsStreamIngestor] end callback from file");
          this.flushBuffer(true);

          this.intervalId = setInterval(() => {
            console.log(
              "[EtablissementsStreamIngestor] checking promise queue length"
            );
            const queueLength = this.promiseQueue.getQueueLength();
            const pendingLength = this.promiseQueue.getPendingLength();
            const remaining = queueLength + pendingLength;
            console.log(
              `[EtablissementsStreamIngestor] ${(
                this.nbItemsSaved *
                100 /
                this.nbItemsToSave
              ).toFixed(2)}% -  ${this.nbItemsSaved} / ${this.nbItemsToSave} `
            );
            console.log(
              `[EtablissementsStreamIngestor] Remaining processes : ${remaining}`
            );
            if (remaining == 0) {
              let responseData = {
                nb: index,
                nbItemsSaved: this.nbItemsSaved
              };
              if (params && params.shouldSaveEntities) {
                console.log("[EtablissementsStreamIngestor] Saving entities");
                this.saveEntities()
                  .then(data => {
                    responseData.entities = data;
                    console.log("[EtablissementsStreamIngestor] Finishing");
                    resolve(responseData);
                  })
                  .catch(err => {
                    reject(err);
                  });
              } else {
                console.log("[EtablissementsStreamIngestor] Finishing");

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
