require("../mongo/db");

const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");
const DepartementsIngestor = require("./DepartementsIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");

const EtablissementsStreamIngestor = require("./EtablissementsStreamIngestor");
var csv = require("fast-csv");
const TIMEOUT = 25000;
beforeEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

afterEach(() => {
  // return Etablissement.remove({});
}, TIMEOUT);

describe("default", () => {
  test("default", () => {
    const filePath = "./data/SIENE_10k.csv";

    const ingestor = new EtablissementsStreamIngestor(filePath);
    return ingestor.save()
    .then( data => {
      console.log(data);
      expect(data.nb).toBe(10007);
      return;
    })
    .catch(err => {
      console.err(err);
    })
  }, TIMEOUT);
});
