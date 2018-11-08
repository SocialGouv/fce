require("../mongo/db");

const SESEParamsIngestor = require("./SESEParamsIngestor");
const EtablissementsIngestor = require("./EtablissementsIngestor");

const Etablissement = require("../models/EtablissementModel");

const filePath = "./data/Base_SESE.xls";
const filePathSIENE = "./data/SIENE_test.csv";

const TIMEOUT = 10000;

describe("default ingestor", () => {
  test("default", () => {
    const ingestor = new SESEParamsIngestor(filePath);
    const data = ingestor.getSESEParams();
    expect(data.length).toEqual(4362);

    expect(data[0].siret).toEqual("00638004200033");
    expect(data[0].eos_filiere).toEqual(
      "Industries et Technologies de santé,\nAlimentaire"
    );

    expect(data[1].eos_filiere).toBeUndefined();

    expect(data[3].siret).toBe("08552019500034");
    expect(data[3].eos_filiere).toBe("Automobile");
  });
});
