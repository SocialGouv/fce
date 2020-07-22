import addInteractions from "./addInteractions";

describe("addInteractions", () => {
  test("merge interactions", () => {
    const entity = {
      siren: "123456789",
      name: "Dave Opper",
      interactions_3E_SEER: [
        {
          siret: "12345678900001",
          date: "2020-06-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Yolo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: "",
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        },
        {
          siret: "12345678900002",
          date: "2020-05-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Polo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: "",
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        }
      ],
      interactions_3E_SRC: [
        {
          siret: "12345678900001",
          date: "2020-04-01",
          pole: "3E_SRC",
          unite: `SRC c'est un dossier`,
          type: "tap",
          agent: null,
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        }
      ],
      interactions_C: null,
      interactions_T: null
    };
    const expected = {
      ...entity,
      interactions: [
        {
          siret: "12345678900001",
          date: "2020-06-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Yolo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: "",
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        },
        {
          siret: "12345678900002",
          date: "2020-05-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Polo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: "",
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        },
        {
          siret: "12345678900001",
          date: "2020-04-01",
          pole: "3E_SRC",
          unite: `SRC c'est un dossier`,
          type: "tap",
          agent: null,
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
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
    expect(addInteractions(entity)).toEqual(expected);
  });

  test("sort by date desc", () => {
    const entity = {
      interactions_3E_SEER: [
        {
          siret: "12345678900001",
          date: "2020-06-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Yolo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: "",
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        },
        {
          siret: "12345678900002",
          date: "2020-08-01",
          pole: "3E_SEER",
          unite: `Service Entreprise Polo`,
          type: "top",
          agent: "Maitre Grims",
          filiere: "",
          eti_pepite: "",
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        }
      ],
      interactions_3E_SRC: [
        {
          siret: "12345678900001",
          date: "2020-07-01",
          pole: "3E_SRC",
          unite: `SRC c'est un dossier`,
          type: "tap",
          agent: null,
          etablissement: {
            adresse_components: {
              code_postal: "78250",
              localite: "MEULAN-EN-YVELINES"
            },
            etat_etablissement: "A"
          }
        }
      ]
    };
    const result = addInteractions(entity);
    const dates = result.interactions.map(({ date }) => date);
    const expected = ["2020-08-01", "2020-07-01", "2020-06-01"];

    expect(dates).toEqual(expected);
  });
});
