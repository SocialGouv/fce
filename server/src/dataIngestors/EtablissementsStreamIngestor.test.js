require("../mongo/db");

const Ingestor = require("./Ingestor");
const WorksheetHelper = require("../helpers/WorksheetHelper");
const Etablissement = require("../models/EtablissementModel");
const Commune = require("../models/CommuneModel");
const Departement = require("../models/DepartementModel");
const CodePostal = require("../models/CodePostalModel");

const DepartementsIngestor = require("./DepartementsIngestor");
const CommunesIngestor = require("./CommunesIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");

const EtablissementsStreamIngestor = require("./EtablissementsStreamIngestor");
const TIMEOUT = 35000;

beforeEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

afterEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

describe("default", () => {
  test(
    "10k",
    () => {
      const filePath = "./data/SIENE_10k.csv";

      const ingestor = new EtablissementsStreamIngestor(filePath);
      return ingestor
        .save()
        .then(data => {
          expect(data.nb).toBe(10007);
          expect(data.nbItemsSaved).toBe(10007);
          return;
        })
        .catch(err => {
          console.error(err);
        });
    },
    TIMEOUT
  );

  test.skip(
    "20k",
    () => {
      const filePath = "./data/SIENE_20k.csv";

      const ingestor = new EtablissementsStreamIngestor(filePath);
      return ingestor
        .save()
        .then(data => {
          expect(data.nb).toBe(20010);
          expect(data.nbItemsSaved).toBe(20010);
          return;
        })
        .catch(err => {
          console.error(err);
        });
    },
    TIMEOUT
  );

  test.skip(
    "FULL BASE",
    () => {
      const filePath = "./data/SIENE_201801_76.csv";

      const ingestor = new EtablissementsStreamIngestor(filePath);
      return ingestor
        .save()
        .then(data => {
          expect(data.nb).toBe(50018);
          expect(data.nbItemsSaved).toBe(50018);
          return;
        })
        .catch(err => {
          console.error(err);
        });
    },
    TIMEOUT * 20
  );
});

describe("saveWithEntities()", () => {
  beforeEach(() => {
    return Etablissement.remove({})
      .then(() => {
        return Commune.remove({});
      })
      .then(() => {
        return CodePostal.remove({});
      })
      .then(() => {
        return Departement.remove({});
      });
  }, TIMEOUT);

  afterEach(() => {
    return Etablissement.remove({})
      .then(() => {
        return Commune.remove({});
      })
      .then(() => {
        return CodePostal.remove({});
      })
      .then(() => {
        return Departement.remove({});
      });
  }, TIMEOUT);

  test(
    "default",
    () => {
      const filePath = "./data/SIENE_10k.csv";

      const ingestor = new EtablissementsStreamIngestor(filePath);
      const params = {
        shouldSaveEntities: true
      };

      return ingestor
        .save(params)
        .then(data => {
          expect(data.nb).toBe(10007);
          expect(data.entities.communes.length).toBe(1585);
          expect(data.entities.codesPostaux.length).toBe(628);
          expect(data.entities.departements.length).toBe(17);
          return;
        })
        .catch(err => {
          console.error(err);
          expect(err).toBeUndefined();
        });
    },
    TIMEOUT
  );
});
