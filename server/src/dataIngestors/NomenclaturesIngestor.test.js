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
        categorie: "source_dernier_eff_phy",
        code: "110",
        libelle_court: "EFF_CREAT",
        libelle: "Effectif de l'entreprise à la création (CFE-SIRENE)"
      });

      expect(data["Code_CJ3"][0]).toEqual({
        categorie: "code_cj3",
        code: "10XX",
        libelle_CJ3: "Personne physique",
        libelle_CJ1: "Entrepreneur individuel"
      });

      expect(data["Code_activite_NAF"][0]).toEqual({
        categorie: "code_activite_naf",
        code: "0111Z",
        libelle:
          "Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses"
      });

      expect(data["Code_Qualite_siege"][0]).toEqual({
        categorie: "code_qualite_siege",
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

  test(
    "save and findByCategory",
    () => {
      const ingestor = new NomenclaturesIngestor(filePath);
      return ingestor
        .save()
        .then(data => {
          return Nomenclature.findByCategory("code_activite_naf");
        })
        .then(data => {
          expect(data.length).toBe(4);
          return Nomenclature.findByCategory("code_qualite_siege");
        })
        .then(data => {
          expect(data.length).toBe(8);
          return;
        });
    },
    TIMEOUT
  );

  test(
    "save and findOneByCategoryAndCode",
    () => {
      const ingestor = new NomenclaturesIngestor(filePath);
      return ingestor
        .save()
        .then(data => {
          return Nomenclature.findOneByCategoryAndCode(
            "code_activite_naf",
            "0112Z"
          );
        })
        .then(data => {
          expect(data.categorie).toBe("code_activite_naf");
          expect(data.code).toBe("0112Z");
          expect(data.libelle).toBe("Culture du riz");

          return Nomenclature.findOneByCategoryAndCode(
            "source_dernier_eff_phy",
            "110"
          );
        })
        .then(data => {
          expect(data.categorie).toBe("source_dernier_eff_phy");
          expect(data.code).toBe("110");
          expect(data.libelle_court).toBe("EFF_CREAT");
          expect(data.libelle).toBe(
            "Effectif de l'entreprise à la création (CFE-SIRENE)"
          );
          return;
        });
    },
    TIMEOUT
  );

  test(
    "reset",
    () => {
      const ingestor = new NomenclaturesIngestor(filePath);
      return ingestor
        .save()
        .then(data => {
          return ingestor.reset();
        })
        .then(data => {
          expect(data.ok).toBe(1);
          return;
        });
    },
    TIMEOUT
  );

  test("Upload", () => {
    const dbParams = {
      shouldSaveEntities: true,
      shouldResetEntities: true
    };
    const ingestor = new NomenclaturesIngestor(filePath);
    return ingestor
      .save(dbParams)
      .then(data => {
        expect(data.length).toBe(40);
        return ingestor.reset(dbParams);
      })
      .then(data => {
        expect(data.ok).toBe(1);
        return;
      });
  });

  test("Upload with reset", () => {
    const dbParams = {
      shouldSaveEntities: true,
      shouldResetEntities: true
    };
    const ingestor = new NomenclaturesIngestor(filePath);
    return ingestor
      .save(dbParams)
      .then(data => {
        expect(data.length).toBe(40);
        return Nomenclature.find({});
      })
      .then(data => {
        expect(data.length).toBe(40);
        return ingestor.reset(dbParams);
      })
      .then(data => {
        expect(data.ok).toBe(1);
        return Nomenclature.find();
      })
      .then(data => {
        expect(data.length).toBe(0);
        return ingestor.save(dbParams);
      })
      .then(data => {
        expect(data.length).toBe(40);
        return;
      });
  });
});
