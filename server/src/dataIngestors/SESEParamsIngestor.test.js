require("../mongo/db");

const SESEParamsIngestor = require("./SESEParamsIngestor");
const EtablissementsIngestor = require("./EtablissementsIngestor");

const Etablissement = require("../models/EtablissementModel");

const filePath = "./data/Base_SESE.xls";
const filePathSIENE = "./data/SIENE_test.csv";

const TIMEOUT = 10000;

describe("default", () => {
  test("default", () => {
    const ingestor = new SESEParamsIngestor(filePath);
    const data = ingestor.getSESEParams();
    expect(data.length).toEqual(4362);

    expect(data[0].siret).toEqual("00638004200033");
    expect(data[0].eos_filiere).toEqual(
      "Industries et Technologies de santé,\nAlimentaire"
    );

    expect(data[1].eos_filiere).toBeUndefined();

    expect(data[3].siret).toBe("01765005200016");
    expect(data[3].eos_filiere).toBe("Automobile");
  });
});

describe("save()", () => {
  beforeEach(() => {
    return Etablissement.remove({});
  }, TIMEOUT);

  afterEach(() => {
    return Etablissement.remove({});
  }, TIMEOUT);

  test("default", () => {
    const etablissementIngestor = new EtablissementsIngestor(filePathSIENE);

    const ingestor = new SESEParamsIngestor(filePath);
    const data = ingestor.getSESEParams();

    return etablissementIngestor
      .save()
      .then(data => {
        return ingestor.save();
      })
      .then(data => {
        expect(data.length).toBe(1);

        expect(data[0].siret).toBe("01765005200016");
        expect(data[0].sese.eos_filiere).toBe("Automobile");

        return Etablissement.findBySIRET("01765005200016");
      })
      .then(data => {
        expect(data.siret).toBe("01765005200016");
        expect(data.sese.eos_filiere).toBe("Automobile");
        return;
      });
  });

  test("reset()", () => {
    const etablissementIngestor = new EtablissementsIngestor(filePathSIENE);

    const ingestor = new SESEParamsIngestor(filePath);
    const data = ingestor.getSESEParams();

    return etablissementIngestor
      .save()
      .then(data => {
        return ingestor.save();
      })
      .then(data => {
        expect(data.length).toBe(1);

        return ingestor.reset();
      })
      .then(data => {
        expect(data.ok).toBe(1);
        expect(data.n).toBe(1);

        return Etablissement.findBySIRET("01765005200016");
      })
      .then(data => {
        expect(data.siret).toBe("01765005200016");
        expect(data.sese).toBeUndefined();
        return;
      });
  });
});
