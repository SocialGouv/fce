require("../mongo/db");

const EtablissementsIngestor = require("./EtablissementsIngestor");
const Etablissement = require("../models/EtablissementModel");

const filePath = "./data/SIENE_test.csv";
const TIMEOUT = 15000;

describe("default", () => {
  test("default", () => {
    const ingestor = new EtablissementsIngestor(filePath);
    const data = ingestor.getEtablissements();
    expect(data[0].siret).toEqual("01765005200016");
    expect(data[0].code_cj3).toEqual("9110");
  });
});

describe("save()", () => {
  beforeEach(() => {
    return Etablissement.remove({});
  }, TIMEOUT);

  afterEach(() => {
    return Etablissement.remove({});
  }, TIMEOUT);

  test(
    "default",
    () => {
      const ingestor = new EtablissementsIngestor(filePath);
      return ingestor
        .save()
        .then(data => {
          expect(data.length).toBe(9);
          // console.log(data);
          expect(data[0].siret).toBe("01765005200016");
          expect(data[0].code_cj3).toEqual("9110");
          expect(data[0].siren).toEqual("017650052");

          // expect(data[8].nom_commercial).toEqual("CABINET FICAT MOULAS");

          return;
        })
        .catch(console.error);
    },
    TIMEOUT
  );
});
