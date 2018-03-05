const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");

const ObjectManipulations = require("../utils/ObjectManipulations");

const Etablissement = require("../models/EtablissementModel");
const CommunesIngestor = require("./CommunesIngestor");
const DepartementsIngestor = require("./DepartementsIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");
var csv = require("fast-csv");

class EtablissementsStreamIngestor extends Ingestor {
  constructor(filePath) {
    // const defaultSheetName = "Sheet1";
    // super(filePath, defaultSheetName);
    super();
    this.filePath = filePath;
    this.Model = Etablissement;
  }

  getData() {
    const wsh = new WorksheetHelper(this.workSheet, {
      keysToLowerCase: true
    });

    const rowsData = wsh.getRowsData();
    return rowsData;
  }

  getEtablissements() {
    return this.getData();
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

  save(shouldSaveEntities) {
    if (shouldSaveEntities) {
      let responseData = { etablissements: [], entities: {} };
      return super
        .save()
        .then(data => {
          responseData.etablissements = data;
          return this.saveEntities();
        })
        .then(data => {
          responseData.entities = data;
          return responseData;
        });
    } else {
      // return super.save();
      const promise = new Promise((resolve, reject) => {
        let index = 0;
        let nbSaved = 0;
        let bufferItems = [];
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
              // console.log(item);
              // bufferItems.push(item);

              if (index % 1000 === 0) {
                console.log(index);
              }
                const model = new this.Model(item);
                // (async function() {
                  const data = await model.save().then( data => {
                    nbSaved++;
                  });
                  // await this.Model.insertMany(bufferItems).then( data => {
                    // console.log(data);
                  // });
                  // bufferItems = [];
                // }.bind(this)());

              index++;
              //   const model = new this.Model(item);
              //
              //   (async  function() {
              //     const data = await model.save();
              //     console.log(data);
              //   }()  ) ;
            }.bind(this)
          )
          .on("end", function() {
            console.log("done");
            const responseData = { nb: index };
            resolve(responseData);
          });
      });
      return promise;
    }
  }

  resetEntities() {
    let entities = { communes: {}, codesPostaux: {}, departements: {} };
    const etablissements = this.getEtablissements();
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
