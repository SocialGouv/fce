require("../mongo/db");
const NomenclaturesIngestor = require("./NomenclaturesIngestor");
const Nomenclature = require("../models/NomenclatureModel");
const TIMEOUT = 10000;

describe("default", () => {
  let filePath = "./data/example.xls";

  test(
    "default",
    () => {
      const ingestor = new NomenclaturesIngestor(filePath);
      const data = ingestor.getNomenclatures();
      expect(data["Source_dernier_eff_phy "][0]).toEqual({
        categorie: "Source_dernier_eff_phy ",
        code: "110",
        libelle_court: "EFF_CREAT",
        libelle: "Effectif de l'entreprise à la création (CFE-SIRENE)"
      });

      expect(data["Code_CJ3"][0]).toEqual({
        categorie: "Code_CJ3",
        code: "10XX",
        libelle_CJ3: "Personne physique",
        libelle_CJ1: "Entrepreneur individuel"
      });

      expect(data["Code_activite_NAF"][0]).toEqual({
        categorie: "Code_activite_NAF",
        code: "0111Z",
        libelle:
          "Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses"
      });

      expect(data["Code_Qualite_siege"][0]).toEqual({
        categorie: "Code_Qualite_siege",
        code: "1",
        libelle: "Siège de direction sans autre activité"
      });
    },
    TIMEOUT
  );

  test(
    "getData",
    () => {
      let filePath = "./data/example_nomenclature.xls";

      const ingestor = new NomenclaturesIngestor(filePath);
      const data = ingestor.getData();
      expect(Array.isArray(data)).toBe(true);
    },
    TIMEOUT
  );
});

describe("save", () => {
  const filePath = "./data/example_nomenclature.xls";

  beforeEach(() => {
    return Nomenclature.remove({});
  }, TIMEOUT);

  afterEach(() => {
    return Nomenclature.remove({});
  }, TIMEOUT);

  test(
    "default",
    () => {
      const ingestor = new NomenclaturesIngestor(filePath);
      return ingestor.save().then(data => {
        expect(data.length).toBe(40);
      });
    },
    TIMEOUT
  );
});
