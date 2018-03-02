require("../mongo/db");

const EtablissementsIngestor = require("../dataIngestors/EtablissementsIngestor");
const Etablissement = require("./EtablissementModel");
const TIMEOUT = 15000;

beforeEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

afterEach(() => {
  return Etablissement.remove({});
}, TIMEOUT);

test(
  "default",
  () => {
    const nData = {
      siret: "01234",
      code_cj3: "0112Z",
      nic_ministere: "0",
      raison_sociale: "entreprise AA"
    };

    const etablissement = new Etablissement(nData);

    return etablissement
      .save()
      .then(() => {
        return Etablissement.findBySIRET(nData.siret);
      })
      .then(data => {
        expect(data.siret).toBe(nData.siret);
        expect(data.code_cj3).toBe(nData.code_cj3);
        expect(data.raison_sociale).toBe(nData.raison_sociale);
      });
  },
  TIMEOUT
);

test(
  "findByRaisonSociale - find 0",
  () => {
    const nData = [
      {
        siret: "01234",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB"
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("nope");
      })
      .then(data => {
        expect(data).toEqual([]);

        return;
      });
  },
  TIMEOUT
);

test(
  "findByRaisonSociale - find 1",
  () => {
    const nData = [
      {
        siret: "01234",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB"
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("entreprise AA");
      })
      .then(data => {
        expect(data.length).toBe(1);

        expect(data[0].siret).toBe(nData[0].siret);
        expect(data[0].code_cj3).toBe(nData[0].code_cj3);
        expect(data[0].raison_sociale).toBe(nData[0].raison_sociale);
        return;
      });
  },
  TIMEOUT
);

test(
  "findByRaisonSociale - find 2",
  () => {
    const nData = [
      {
        siret: "01234",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_cj3: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB"
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("entreprise A");
      })
      .then(data => {
        expect(data.length).toBe(2);

        expect(data[0].siret).toBe(nData[0].siret);
        expect(data[1].siret).toBe(nData[1].siret);
        return;
      });
  },
  TIMEOUT
);

describe("Advanced search", () => {
  test("default", () => {
    const searchParams = {
      libelle_commune: "TOULOUSE",
      code_activite: "8110Z"
    };
    Etablissement.findByAdvancedSearch(searchParams).then(data => {
      expect(data.length).toEqual(0);
    });
  });

  test(
    "findByAdvancedSearch",
    () => {
      const nData = [
        {
          siret: "01234",
          code_activite: "8110Z",
          libelle_commune: "TOULOUSE"
        },
        {
          siret: "01235",
          code_activite: "8110Z",
          libelle_commune: "TOULOUSE"
        }
      ];

      const searchParams = {
        libelle_commune: "TOULOUSE",
        code_activite: "8110Z"
      };

      return new Etablissement(nData[0])
        .save()
        .then(() => {
          return new Etablissement(nData[1]).save();
        })
        .then(() => {
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toEqual(2);
        });
    },
    TIMEOUT
  );

  test(
    "findByAdvancedSearch - only NAF",
    () => {
      const nData = [
        {
          siret: "01234",
          code_activite: "8110Z"
        },
        {
          siret: "01235",
          code_activite: "8111Z"
        }
      ];

      const searchParams = {
        code_activite: "8110Z"
      };

      return new Etablissement(nData[0])
        .save()
        .then(() => {
          return new Etablissement(nData[1]).save();
        })
        .then(() => {
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toEqual(1);
          expect(data[0].code_activite).toEqual("8110Z");
        });
    },
    TIMEOUT
  );

  test(
    "findByAdvancedSearch - raison sociale et NAF",
    () => {
      const nData = [
        {
          siret: "01234",
          code_activite: "8110Z",
          raison_sociale: "ENTREPRISE 1"
        },
        {
          siret: "01235",
          code_activite: "8110Z",
          raison_sociale: "ENTREPRISE 10"
        },
        ,
        {
          siret: "01236",
          code_activite: "8110Z",
          raison_sociale: "ENTREPRISE 2"
        }
      ];

      const searchParams = {
        code_activite: "8110Z",
        raison_sociale: "ENTREPRISE 1"
      };

      return new Etablissement(nData[0])
        .save()
        .then(() => {
          return new Etablissement(nData[1]).save();
        })
        .then(() => {
          return new Etablissement(nData[2]).save();
        })
        .then(() => {
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toEqual(2);
          expect(data[0].raison_sociale).toEqual("ENTREPRISE 1");
          expect(data[1].raison_sociale).toEqual("ENTREPRISE 10");
        });
    },
    TIMEOUT
  );

  const filePath = "./data/SIENE_test.csv";
  test(
    "findByAdvancedSearch - from .csv",
    () => {
      const ingestor = new EtablissementsIngestor(filePath);

      let searchParams = {
        code_activite: "8110Z"
      };

      return ingestor
        .save()
        .then(data => {
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toBe(6);

          searchParams = {
            code_activite: "8110Z",
            libelle_commune: "TOULOUSE"
          };
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toBe(5);

          searchParams = {
            code_activite: "8110Z",
            libelle_commune: "TOULOUSE",
            raison_sociale: "SYNDICAT DES COPROPRIETAIRE   RESID"
          };
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toBe(2);
          searchParams = {
            code_activite: "8110Z",
            code_postal: "31300",
            raison_sociale: "SYNDICAT DES COPROPRIETAIRE   RESID"
          };
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toBe(1);
        });
    },
    TIMEOUT
  );
});
