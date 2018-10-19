require("../mongo/db");

const CodesPostauxIngestor = require("../dataIngestors/CodesPostauxIngestor");
const CodePostal = require("./CodePostalModel");
const TIMEOUT = 15000;

beforeEach(() => {
  return CodePostal.remove({});
}, TIMEOUT);

afterEach(() => {
  return CodePostal.remove({});
}, TIMEOUT);

test(
  "default",
  () => {
    const nData = {
      code_postal: "31560",
      code_commune: "31100",
      libelle_commune: "Calmont"
    };

    const codePostal = new CodePostal(nData);

    return codePostal
      .save()
      .then(() => {
        return CodePostal.findOne({ code_postal: nData.code_postal });
      })
      .then(data => {
        expect(data.code_postal).toBe(nData.code_postal);
        expect(data.code_commune).toBe(nData.code_commune);
        expect(data.libelle_commune).toBe(nData.libelle_commune);
      });
  },
  TIMEOUT
);

test(
  "findOneByCode",
  () => {
    const nData = {
      code_postal: "31560",
      code_commune: "31100",
      libelle_commune: "Calmont"
    };

    const codePostal = new CodePostal(nData);

    return codePostal
      .save()
      .then(() => {
        return CodePostal.findOneByCode(nData.code_postal);
      })
      .then(data => {
        expect(data.code_postal).toBe(nData.code_postal);
        expect(data.code_commune).toBe(nData.code_commune);
        expect(data.libelle_commune).toBe(nData.libelle_commune);
      });
  },
  TIMEOUT
);
