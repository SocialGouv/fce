require("../mongo/db");

const EtablissementsIngestor = require("./EtablissementsIngestor");
const CommunesIngestor = require("./CommunesIngestor");
const Commune = require("../models/CommuneModel");

const filePath = "./data/SIENE_test.csv";
const TIMEOUT = 10000;

describe("default", () => {
  test("default", () => {
    const etablissementsIngestor = new EtablissementsIngestor(filePath);
    const etablissements = etablissementsIngestor.getEtablissements();

    const communesIngestor = new CommunesIngestor();
    const data = communesIngestor.getCommunesFromEtablissements(etablissements);

    expect(data).toEqual([
      { code_commune: "30189", libelle_commune: "NIMES" },
      { code_commune: "31149", libelle_commune: "COLOMIERS" },
      { code_commune: "31555", libelle_commune: "TOULOUSE" }
    ]);
  });
});

describe("save()", () => {
  beforeEach(() => {
    return Commune.remove({});
  }, TIMEOUT);

  afterEach(() => {
    return Commune.remove({});
  }, TIMEOUT);

  test("default", () => {
    const etablissementsIngestor = new EtablissementsIngestor(filePath);
    const etablissements = etablissementsIngestor.getEtablissements();

    const communesIngestor = new CommunesIngestor();
    const data = communesIngestor.getCommunesFromEtablissements(etablissements);
    return communesIngestor.save(etablissements).then(data => {
      expect(data.length).toEqual(3);
      expect(data[0].code_commune).toEqual("30189");
      expect(data[1].code_commune).toEqual("31149");
      expect(data[2].code_commune).toEqual("31555");
    });
  });
});
