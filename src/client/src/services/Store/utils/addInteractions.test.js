import addInteractions from "./addInteractions";

describe("addInteractions", () => {
  test("merge interactions", () => {
    const entity = {
      interactions_3E_SEER: [
        {
          agent: "Maitre Grims",
          date: "2020-06-01",
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
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
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
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
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
          pole: "3E_SRC",
          siret: "12345678900001",
          type: "tap",
          unite: `SRC c'est un dossier`,
        },
      ],
      interactions_C: null,
      interactions_T: null,
      name: "Dave Opper",
      siren: "123456789",
    };
    const expected = {
      ...entity,
      interactions: [
        {
          agent: "Maitre Grims",
          date: "2020-06-01",
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
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
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
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
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
          pole: "3E_SRC",
          siret: "12345678900001",
          type: "tap",
          unite: `SRC c'est un dossier`,
        },
      ],
      totalInteractions: {
        "3E_SEER": 2,
        "3E_SRC": 1,
        C: 0,
        T: 0,
        total: 3,
      },
    };
    expect(addInteractions(entity)).toEqual(expected);
  });

  test("sort by date desc", () => {
    const entity = {
      interactions_3E_SEER: [
        {
          agent: "Maitre Grims",
          date: "2020-06-01",
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
          eti_pepite: "",
          filiere: "",
          pole: "3E_SEER",
          siret: "12345678900001",
          type: "top",
          unite: `Service Entreprise Yolo`,
        },
        {
          agent: "Maitre Grims",
          date: "2020-08-01",
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
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
          date: "2020-07-01",
          etablissement: {
            adresse_composant: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES",
            },
            etat_etablissement: "A",
          },
          pole: "3E_SRC",
          siret: "12345678900001",
          type: "tap",
          unite: `SRC c'est un dossier`,
        },
      ],
    };
    const result = addInteractions(entity);
    const dates = result.interactions.map(({ date }) => date);
    const expected = ["2020-08-01", "2020-07-01", "2020-06-01"];

    expect(dates).toEqual(expected);
  });
});
