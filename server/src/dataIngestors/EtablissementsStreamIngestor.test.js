require("../mongo/db");

const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");
const DepartementsIngestor = require("./DepartementsIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");

const EtablissementsStreamIngestor = require("./EtablissementsStreamIngestor");
var csv = require("fast-csv");
const TIMEOUT = 35000;
beforeEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

afterEach(() => {
  // return Etablissement.remove({});
}, TIMEOUT);

describe("default", () => {
  test.skip("10k", () => {
    const filePath = "./data/SIENE_10k.csv";

    const ingestor = new EtablissementsStreamIngestor(filePath);
    return ingestor.save()
    .then( data => {
      expect(data.nb).toBe(10007);
      expect(data.nbItemsSaved).toBe(10007);
      return;
    })
    .catch(err => {
      console.error(err);
    })
  }, TIMEOUT);

  test.skip("20k", () => {
    const filePath = "./data/SIENE_20k.csv";

    const ingestor = new EtablissementsStreamIngestor(filePath);
    return ingestor.save()
    .then( data => {
      expect(data.nb).toBe(20010);
      expect(data.nbItemsSaved).toBe(20010);
      return;
    })
    .catch(err => {
      console.error(err);
    })
  }, TIMEOUT);

  test("FULL BASE", () => {
    const filePath = "./data/SIENE_201801_76.csv";

    const ingestor = new EtablissementsStreamIngestor(filePath);
    return ingestor.save()
    .then( data => {
      expect(data.nb).toBe(50018);
      expect(data.nbItemsSaved).toBe(50018);
      return;
    })
    .catch(err => {
      console.error(err);
    })
  }, TIMEOUT*20);
});
