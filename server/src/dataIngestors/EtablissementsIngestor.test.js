require("../mongo/db");

const EtablissementsIngestor = require("./EtablissementsIngestor");
const Etablissement = require("../models/EtablissementModel");
const Commune = require("../models/CommuneModel");

const filePath = "./data/SIENE_test.csv";
const TIMEOUT = 15000;

describe("default", () => {
  test("default", () => {
    const ingestor = new EtablissementsIngestor(filePath);
    const data = ingestor.getEtablissements();

    expect(data[0].siret).toEqual("1765005200016");
    expect(data[0].code_cj3).toEqual("9110");
    expect(data[0].raison_sociale).toEqual("COPROPRIETAIRES");

    expect(data[8].nom_commercial).toEqual("CABINET FICAT MOULAS");
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

          expect(data[0].siret).toBe("1765005200016");
          expect(data[0].code_cj3).toEqual("9110");
          expect(data[0].siren).toEqual("17650052");
          expect(data[0].raison_sociale).toEqual("COPROPRIETAIRES");

          expect(data[8].nom_commercial).toEqual("CABINET FICAT MOULAS");
          return;
        })
        .catch(console.error);
    },
    TIMEOUT
  );
});

describe("saveWithEntities()", () => {
  beforeEach(() => {
    return Etablissement.remove({}).then(() => {
      return Commune.remove({});
    });
  }, TIMEOUT);

  afterEach(() => {
    return Etablissement.remove({}).then(() => {
      return Commune.remove({});
    });
  }, TIMEOUT);

  test(
    "Communes",
    () => {
      const ingestor = new EtablissementsIngestor(filePath);
      const shouldSaveEntities = true;
      return ingestor
        .save(shouldSaveEntities)
        .then(data => {
          expect(data.etablissements.length).toBe(9);
          expect(data.entities.communes.length).toBe(3);
          expect(data.entities.codePostaux.length).toBe(0);
          expect(data.entities.departements.length).toBe(0);
          return;
        })
        .catch(console.error);
    },
    TIMEOUT
  );
});
