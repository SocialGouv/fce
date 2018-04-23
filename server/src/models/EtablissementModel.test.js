require("../mongo/db");

const EtablissementsIngestor = require("../dataIngestors/EtablissementsIngestor");
const Etablissement = require("./EtablissementModel");
const Interaction = require("./InteractionModel");
const TIMEOUT = 15000;

beforeEach(() => {
  return Etablissement.remove({}).then(() => {
    return Interaction.remove({});
  });
}, TIMEOUT);

afterEach(() => {
  return Etablissement.remove({}).then(() => {
    return Interaction.remove({});
  });
}, TIMEOUT);

test(
  "default",
  () => {
    const nData = {
      siret: "01234",
      code_activite: "0112Z",
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
        expect(data.code_activite).toBe(nData.code_activite);
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
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_activite: "0112Z",
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
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_activite: "0112Z",
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
        expect(data[0].code_activite).toBe(nData[0].code_activite);
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
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_activite: "0112Z",
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

test(
  "findByRaisonSociale - contain interactions",
  () => {
    const nData = [
      {
        siret: "0123456789",
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA"
      },
      {
        siret: "01235",
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB"
      }
    ];
    const interactionsData = [
      {
        siret: "0123456789",
        unite: "Unité 3",
        type_intervention: "Enquête",
        cible_intervention: "Chantier",
        pole: "C",
        date: new Date()
      },
      {
        siret: "01235",
        unite: "Unité 666",
        type_intervention: "Ecouter",
        cible_intervention: "Chanson",
        pole: "3E",
        date: new Date()
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return new Interaction(interactionsData[0]).save();
      })
      .then(() => {
        return new Interaction(interactionsData[1]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("entreprise AA");
      })
      .then(data => {
        expect(data[0].interactions.length).toBe(1);
        expect(data[0].interactions[0].type_intervention).toBe(
          interactionsData[0].type_intervention
        );
        expect(data[0].interactions[0].pole).toBe(interactionsData[0].pole);
        return;
      });
  },
  TIMEOUT
);

test(
  "findByRaisonSociale - sort by raison_sociale and code_etat",
  () => {
    const nData = [
      {
        siret: "01234",
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA",
        code_etat: "3"
      },
      {
        siret: "01235",
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AB",
        code_etat: "1"
      },
      {
        siret: "01236",
        code_activite: "0112Z",
        nic_ministere: "0",
        raison_sociale: "entreprise AA",
        code_etat: "1"
      }
    ];

    return new Etablissement(nData[0])
      .save()
      .then(() => {
        return new Etablissement(nData[1]).save();
      })
      .then(() => {
        return new Etablissement(nData[2]).save();
      })
      .then(() => {
        return Etablissement.findByRaisonSociale("entreprise A");
      })
      .then(data => {
        expect(["01236", "01234", "01235"]).toEqual(
          data.map(line => line.siret)
        );
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

  test(
    "findByAdvancedSearch - only siege",
    () => {
      const nData = [
        {
          raison_sociale: "Youloulou",
          siret: "01234",
          siren: "012",
          nic_du_siege: "34"
        },
        {
          raison_sociale: "Polololo",
          siret: "01234",
          siren: "012",
          nic_du_siege: "66"
        }
      ];

      const searchParams = {
        siege_social: true
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
          expect(data[0].raison_sociale).toEqual("Youloulou");
        });
    },
    TIMEOUT
  );

  test(
    "findByAdvancedSearch - contain interactions",
    () => {
      const nData = [
        {
          siret: "0123456789",
          code_activite: "8110Z"
        },
        {
          siret: "01235",
          code_activite: "8111Z"
        }
      ];

      const interactionsData = [
        {
          siret: "0123456789",
          unite: "Unité 3",
          type_intervention: "Enquête",
          cible_intervention: "Chantier",
          pole: "C",
          date: new Date()
        },
        {
          siret: "01235",
          unite: "Unité 666",
          type_intervention: "Ecouter",
          cible_intervention: "Chanson",
          pole: "3E",
          date: new Date()
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
          return new Interaction(interactionsData[0]).save();
        })
        .then(() => {
          return new Interaction(interactionsData[1]).save();
        })
        .then(() => {
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data.length).toEqual(1);
          expect(data[0].siret).toEqual("0123456789");
        });
    },
    TIMEOUT
  );

  test(
    "findByAdvancedSearch - filter by interactions",
    () => {
      const nData = [
        {
          siret: "0123456789",
          code_activite: "8110Z"
        },
        {
          siret: "01235",
          code_activite: "8111Z"
        }
      ];

      const interactionsData = [
        {
          siret: "0123456789",
          unite: "Unité 3",
          type_intervention: "Enquête",
          cible_intervention: "Chantier",
          pole: "C",
          date: new Date()
        },
        {
          siret: "01235",
          unite: "Unité 666",
          type_intervention: "Ecouter",
          cible_intervention: "Chanson",
          pole: "3E",
          date: new Date()
        }
      ];

      const searchParams = {
        interactions: ["C", "T"]
      };

      return new Etablissement(nData[0])
        .save()
        .then(() => {
          return new Etablissement(nData[1]).save();
        })
        .then(() => {
          return new Interaction(interactionsData[0]).save();
        })
        .then(() => {
          return new Interaction(interactionsData[1]).save();
        })
        .then(() => {
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(data[0].interactions.length).toBe(1);
          expect(data[0].interactions[0].type_intervention).toBe(
            interactionsData[0].type_intervention
          );
          expect(data[0].interactions[0].pole).toBe(interactionsData[0].pole);
        });
    },
    TIMEOUT
  );

  test(
    "findByAdvancedSearch - sort by raison_sociale and code_etat",
    () => {
      const nData = [
        {
          siret: "01234",
          code_activite: "0112Z",
          nic_ministere: "0",
          raison_sociale: "entreprise AA",
          code_etat: "3"
        },
        {
          siret: "01235",
          code_activite: "0112Z",
          nic_ministere: "0",
          raison_sociale: "entreprise AB",
          code_etat: "1"
        },
        {
          siret: "01236",
          code_activite: "0112Z",
          nic_ministere: "0",
          raison_sociale: "entreprise AA",
          code_etat: "1"
        },
        {
          siret: "01237",
          code_activite: "9999A",
          nic_ministere: "0",
          raison_sociale: "entreprise AA",
          code_etat: "1"
        }
      ];

      const searchParams = {
        code_activite: "0112Z"
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
          return new Etablissement(nData[3]).save();
        })
        .then(() => {
          return Etablissement.findByAdvancedSearch(searchParams);
        })
        .then(data => {
          expect(["01236", "01234", "01235"]).toEqual(
            data.map(line => line.siret)
          );
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

describe("Insert many", () => {
  const filePath = "./data/SIENE_test.csv";
  test("default", () => {
    const ingestor = new EtablissementsIngestor(filePath);

    const etablissements = ingestor.getEtablissements();
    return Etablissement.insertMany(etablissements.concat(etablissements)).then(
      data => {
        expect(data.length).toBe(18);
      }
    );
  });
});

describe("Find entities", () => {
  const filePath = "./data/SIENE_test.csv";
  test(
    "findDisctinctCommunes",
    () => {
      const ingestor = new EtablissementsIngestor(filePath);

      return ingestor
        .save()
        .then(data => {
          return Etablissement.findDisctinctCommunes();
        })
        .then(data => {
          expect(data.length).toBe(3);
          expect(data).toEqual(["COLOMIERS", "NIMES", "TOULOUSE"]);
        });
    },
    TIMEOUT
  );

  test(
    "findDisctinctCodesPostaux",
    () => {
      const ingestor = new EtablissementsIngestor(filePath);

      return ingestor
        .save()
        .then(data => {
          return Etablissement.findDisctinctCodesPostaux();
        })
        .then(data => {
          expect(data.length).toBe(6);
          expect(data).toEqual([
            "30000",
            "31000",
            "31100",
            "31300",
            "31500",
            "31770"
          ]);
        });
    },
    TIMEOUT
  );

  test(
    "findDisctinctDepartements",
    () => {
      const ingestor = new EtablissementsIngestor(filePath);

      return ingestor
        .save()
        .then(data => {
          return Etablissement.findDisctinctDepartements();
        })
        .then(data => {
          expect(data.length).toBe(2);
          expect(data).toEqual(["30", "31"]);
        });
    },
    TIMEOUT
  );
});

describe("findSIRETsBySIREN", () => {
  const filePath = "./data/SIENE_test.csv";

  test(
    "findBySIREN",
    () => {
      const ingestor = new EtablissementsIngestor(filePath);
      const siren = "035217611";
      return ingestor
        .save()
        .then(data => {
          return Etablissement.findSIRETsBySIREN(siren);
        })
        .then(data => {
          expect(data.length).toBe(2);
        });
    },
    TIMEOUT
  );
});
