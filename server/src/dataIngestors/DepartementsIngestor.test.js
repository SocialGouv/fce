require("../mongo/db");

const EtablissementsIngestor = require("./EtablissementsIngestor");
const DepartementsIngestor = require("./DepartementsIngestor");
const Departement = require("../models/DepartementModel");
const Etablissement = require("../models/EtablissementModel");

const filePath = "./data/SIENE_test.csv";
const TIMEOUT = 10000;

describe("default", () => {
  test("default", () => {
    const etablissementsIngestor = new EtablissementsIngestor(filePath);
    const etablissements = etablissementsIngestor.getEtablissements();

    const departementsIngestor = new DepartementsIngestor();
    const data = departementsIngestor.getDepartementsFromEtablissements(
      etablissements
    );

    expect(data).toEqual([
      { code_departement: "30" },
      { code_departement: "31" }
    ]);
  });
});

describe("save()", () => {
  beforeEach(() => {
    return Departement.remove({});
  }, TIMEOUT);

  afterEach(() => {
    return Departement.remove({});
  }, TIMEOUT);

  test(
    "default",
    () => {
      const etablissementsIngestor = new EtablissementsIngestor(filePath);
      const etablissements = etablissementsIngestor.getEtablissements();

      const departementsIngestor = new DepartementsIngestor();
      const data = departementsIngestor.getDepartementsFromEtablissements(
        etablissements
      );
      const saveParams = {
        etablissements
      };
      return departementsIngestor.save(saveParams).then(data => {
        expect(data.length).toEqual(2);
        expect(data[0].code_departement).toEqual("30");
        expect(data[1].code_departement).toEqual("31");
      });
    },
    TIMEOUT
  );
});

describe("getDepartementsFromMongo()", () => {
  beforeEach(() => {
    return Departement.remove({}).then(() => {
      Etablissement.remove({});
    });
  }, TIMEOUT);

  afterEach(() => {
    return Departement.remove({}).then(() => {
      Etablissement.remove({});
    });
  }, TIMEOUT);

  test("default", () => {
    const etablissementsIngestor = new EtablissementsIngestor(filePath);

    const departementsIngestor = new DepartementsIngestor();
    const saveParams = {
      mongo: true
    };
    return etablissementsIngestor
      .save()
      .then(data => {
        return departementsIngestor.getDepartementsFromMongo();
      })
      .then(data => {
        expect(data.length).toEqual(2);
        expect(data[0].code_departement).toEqual("30");
        expect(data[1].code_departement).toEqual("31");
      });
  });
});
