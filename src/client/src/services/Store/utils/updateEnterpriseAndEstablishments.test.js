import updateEnterpriseAndEstablishments from "./updateEnterpriseAndEstablishments";

const emptyInteractions = {
  interactions: [],
  totalInteractions: {
    "3E_SEER": 0,
    "3E_SRC": 0,
    C: 0,
    T: 0,
    total: 0
  }
};

describe("updateEnterpriseAndEstablishment", () => {
  test("update only empty data", () => {
    const current = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01"
    };
    const newData = {
      siren: "123456789",
      raison_sociale: "Phil Electrique",
      capital_social: 666,
      tranche_effectif: "02"
    };
    const expected = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: 666,
      date_de_creation: "2017-08-01",
      tranche_effectif: "02",
      ...emptyInteractions
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("if is not the same enterprise return newData", () => {
    const current = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01"
    };
    const newData = {
      siren: "987654321",
      raison_sociale: "Tif'Ene",
      capital_social: 123,
      tranche_effectif: "01"
    };
    const expected = { ...newData, ...emptyInteractions };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("update some establishments", () => {
    const current = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          siege_social: true,
          siret: "12345678900001",
          etat_etablissement: "A",
          code_region: null
        },
        {
          siege_social: false,
          siret: "12345678900002",
          etat_etablissement: "B",
          code_region: null
        },
        {
          siege_social: false,
          siret: "12345678900003",
          etat_etablissement: "C",
          code_region: null
        }
      ]
    };
    const newData = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          siege_social: true,
          siret: "12345678900001",
          etat_etablissement: "Z",
          code_region: 1
        },
        {
          siege_social: false,
          siret: "12345678900002",
          etat_etablissement: "Z",
          code_region: 2,
          naf: "62.01Z"
        },
        {
          siege_social: false,
          siret: "12345678900004",
          etat_etablissement: "K",
          code_region: 2,
          naf: "62.01Z"
        }
      ]
    };
    const expected = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          siege_social: true,
          siret: "12345678900001",
          etat_etablissement: "A",
          code_region: 1,
          ...emptyInteractions
        },
        {
          siege_social: false,
          siret: "12345678900002",
          etat_etablissement: "B",
          code_region: 2,
          naf: "62.01Z",
          ...emptyInteractions
        },
        {
          siege_social: false,
          siret: "12345678900003",
          etat_etablissement: "C",
          code_region: null,
          ...emptyInteractions
        },
        {
          siege_social: false,
          siret: "12345678900004",
          etat_etablissement: "K",
          code_region: 2,
          naf: "62.01Z",
          ...emptyInteractions
        }
      ],
      ...emptyInteractions
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("merge _dataSources", () => {
    const current = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01",
      _dataSources: { CIA: true, DGSE: false },
      etablissements: [
        {
          siege_social: true,
          siret: "12345678900001",
          etat_etablissement: "A",
          code_region: null,
          _dataSources: { CIA: true, DGSE: false }
        }
      ]
    };
    const newData = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01",
      _dataSources: { KGB: true },
      etablissements: [
        {
          siege_social: true,
          siret: "12345678900001",
          etat_etablissement: "A",
          code_region: null,
          _dataSources: { KGB: true }
        },
        {
          siege_social: false,
          siret: "12345678900002",
          etat_etablissement: "B",
          code_region: 2,
          naf: "62.01Z",
          _dataSources: { KGB: true }
        }
      ]
    };
    const expected = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      capital_social: null,
      date_de_creation: "2017-08-01",
      _dataSources: { CIA: true, DGSE: false, KGB: true },
      etablissements: [
        {
          siege_social: true,
          siret: "12345678900001",
          etat_etablissement: "A",
          code_region: null,
          _dataSources: { CIA: true, DGSE: false, KGB: true },
          ...emptyInteractions
        },
        {
          siege_social: false,
          siret: "12345678900002",
          etat_etablissement: "B",
          code_region: 2,
          naf: "62.01Z",
          _dataSources: { KGB: true },
          ...emptyInteractions
        }
      ],
      ...emptyInteractions
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("add interactions to enterprise", () => {
    const current = {};
    const newData = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      interactions_3E_SEER: [
        {
          siret: "12345678900001",
          date: "2020-06-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Yolo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: ""
        },
        {
          siret: "12345678900002",
          date: "2020-05-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Polo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: ""
        }
      ],
      interactions_3E_SRC: [
        {
          siret: "12345678900001",
          date: "2020-04-01",
          pole: "3E_SRC",
          unite: `SRC c'est un dossier`,
          type: "tap",
          agent: null
        }
      ]
    };

    const expected = {
      siren: "123456789",
      raison_sociale: "Phil Electrik",
      interactions_3E_SEER: [
        {
          siret: "12345678900001",
          date: "2020-06-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Yolo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: ""
        },
        {
          siret: "12345678900002",
          date: "2020-05-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Polo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: ""
        }
      ],
      interactions_3E_SRC: [
        {
          siret: "12345678900001",
          date: "2020-04-01",
          pole: "3E_SRC",
          unite: `SRC c'est un dossier`,
          type: "tap",
          agent: null
        }
      ],
      interactions: [
        {
          siret: "12345678900001",
          date: "2020-06-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Yolo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: ""
        },
        {
          siret: "12345678900002",
          date: "2020-05-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Polo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: ""
        },
        {
          siret: "12345678900001",
          date: "2020-04-01",
          pole: "3E_SRC",
          unite: `SRC c'est un dossier`,
          type: "tap",
          agent: null
        }
      ],
      totalInteractions: {
        C: 0,
        "3E_SEER": 2,
        "3E_SRC": 1,
        T: 0,
        total: 3
      }
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });
});
