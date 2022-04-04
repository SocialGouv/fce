import updateEnterpriseAndEstablishments from "./updateEnterpriseAndEstablishments";

const emptyInteractions = {
  interactions: [],
  totalInteractions: {
    "3E_SEER": 0,
    "3E_SRC": 0,
    C: 0,
    T: 0,
    total: 0,
  },
};

describe("updateEnterpriseAndEstablishment", () => {
  test("update only empty data", () => {
    const current = {
      capital_social: null,
      date_de_creation: "2017-08-01",
      raison_sociale: "Phil Electrik",
      siren: "123456789",
    };
    const newData = {
      capital_social: 666,
      raison_sociale: "Phil Electrique",
      siren: "123456789",
      tranche_effectif: "02",
    };
    const expected = {
      capital_social: 666,
      date_de_creation: "2017-08-01",
      raison_sociale: "Phil Electrik",
      siren: "123456789",
      tranche_effectif: "02",
      ...emptyInteractions,
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("if is not the same enterprise return newData", () => {
    const current = {
      capital_social: null,
      date_de_creation: "2017-08-01",
      raison_sociale: "Phil Electrik",
      siren: "123456789",
    };
    const newData = {
      capital_social: 123,
      raison_sociale: "Tif'Ene",
      siren: "987654321",
      tranche_effectif: "01",
    };
    const expected = { ...newData, ...emptyInteractions };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("update some establishments", () => {
    const current = {
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          code_region: null,
          etat_etablissement: "A",
          siege_social: true,
          siret: "12345678900001",
        },
        {
          code_region: null,
          etat_etablissement: "B",
          siege_social: false,
          siret: "12345678900002",
        },
        {
          code_region: null,
          etat_etablissement: "C",
          siege_social: false,
          siret: "12345678900003",
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
    };
    const newData = {
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          code_region: 1,
          etat_etablissement: "Z",
          siege_social: true,
          siret: "12345678900001",
        },
        {
          code_region: 2,
          etat_etablissement: "Z",
          naf: "62.01Z",
          siege_social: false,
          siret: "12345678900002",
        },
        {
          code_region: 2,
          etat_etablissement: "K",
          naf: "62.01Z",
          siege_social: false,
          siret: "12345678900004",
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
    };
    const expected = {
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          code_region: 1,
          etat_etablissement: "A",
          siege_social: true,
          siret: "12345678900001",
          ...emptyInteractions,
        },
        {
          code_region: 2,
          etat_etablissement: "B",
          naf: "62.01Z",
          siege_social: false,
          siret: "12345678900002",
          ...emptyInteractions,
        },
        {
          code_region: null,
          etat_etablissement: "C",
          siege_social: false,
          siret: "12345678900003",
          ...emptyInteractions,
        },
        {
          code_region: 2,
          etat_etablissement: "K",
          naf: "62.01Z",
          siege_social: false,
          siret: "12345678900004",
          ...emptyInteractions,
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
      ...emptyInteractions,
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("merge _dataSources", () => {
    const current = {
      _dataSources: { CIA: true, DGSE: false },
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          _dataSources: { CIA: true, DGSE: false },
          code_region: null,
          etat_etablissement: "A",
          siege_social: true,
          siret: "12345678900001",
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
    };
    const newData = {
      _dataSources: { KGB: true },
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          _dataSources: { KGB: true },
          code_region: null,
          etat_etablissement: "A",
          siege_social: true,
          siret: "12345678900001",
        },
        {
          _dataSources: { KGB: true },
          code_region: 2,
          etat_etablissement: "B",
          naf: "62.01Z",
          siege_social: false,
          siret: "12345678900002",
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
    };
    const expected = {
      _dataSources: { CIA: true, DGSE: false, KGB: true },
      capital_social: null,
      date_de_creation: "2017-08-01",
      etablissements: [
        {
          _dataSources: { CIA: true, DGSE: false, KGB: true },
          code_region: null,
          etat_etablissement: "A",
          siege_social: true,
          siret: "12345678900001",
          ...emptyInteractions,
        },
        {
          _dataSources: { KGB: true },
          code_region: 2,
          etat_etablissement: "B",
          naf: "62.01Z",
          siege_social: false,
          siret: "12345678900002",
          ...emptyInteractions,
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
      ...emptyInteractions,
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });

  test("add interactions to enterprise", () => {
    const current = {};
    const newData = {
      interactions_3E_SEER: [
        {
          agent: "Maitre Grims",
          date: "2020-06-01",
          eti_pepite: "",
          filiere: "",
          pole: "3E_SEER",
          siret: "12345678900001",
          type: "top",
          unite: `Service Entreprise Yolo`,
        },
        {
          agent: "Maitre Grims",
          date: "2020-05-01",
          eti_pepite: "",
          filiere: "",
          pole: "3E_SEER",
          siret: "12345678900002",
          type: "top",
          unite: `Service Entreprise Polo`,
        },
      ],
      interactions_3E_SRC: [
        {
          agent: null,
          date: "2020-04-01",
          pole: "3E_SRC",
          siret: "12345678900001",
          type: "tap",
          unite: `SRC c'est un dossier`,
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
    };

    const expected = {
      interactions: [
        {
          agent: "Maitre Grims",
          date: "2020-06-01",
          eti_pepite: "",
          filiere: "",
          pole: "3E_SEER",
          siret: "12345678900001",
          type: "top",
          unite: `Service Entreprise Yolo`,
        },
        {
          agent: "Maitre Grims",
          date: "2020-05-01",
          eti_pepite: "",
          filiere: "",
          pole: "3E_SEER",
          siret: "12345678900002",
          type: "top",
          unite: `Service Entreprise Polo`,
        },
        {
          agent: null,
          date: "2020-04-01",
          pole: "3E_SRC",
          siret: "12345678900001",
          type: "tap",
          unite: `SRC c'est un dossier`,
        },
      ],
      interactions_3E_SEER: [
        {
          agent: "Maitre Grims",
          date: "2020-06-01",
          eti_pepite: "",
          filiere: "",
          pole: "3E_SEER",
          siret: "12345678900001",
          type: "top",
          unite: `Service Entreprise Yolo`,
        },
        {
          agent: "Maitre Grims",
          date: "2020-05-01",
          eti_pepite: "",
          filiere: "",
          pole: "3E_SEER",
          siret: "12345678900002",
          type: "top",
          unite: `Service Entreprise Polo`,
        },
      ],
      interactions_3E_SRC: [
        {
          agent: null,
          date: "2020-04-01",
          pole: "3E_SRC",
          siret: "12345678900001",
          type: "tap",
          unite: `SRC c'est un dossier`,
        },
      ],
      raison_sociale: "Phil Electrik",
      siren: "123456789",
      totalInteractions: {
        "3E_SEER": 2,
        "3E_SRC": 1,
        C: 0,
        T: 0,
        total: 3,
      },
    };

    expect(updateEnterpriseAndEstablishments(current, newData)).toEqual(
      expected
    );
  });
});
