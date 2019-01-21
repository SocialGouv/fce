import { nestcribe_path as test } from "../../../utils";

import getEntreprise from "../../../../src/DataSources/ApiGouv/EntreprisesAPI/getEntreprise";

test("DataSources/ApiGouv/EntreprisesAPI/getEntreprise", () => {
  describe("sucessfully parse data", async () => {
    const testCases = [
      {
        it: "doesn't copy useless values",
        data: { useless: true, entreprise: { also_useless: true } },
        expected: {}
      },
      {
        it: "does copy categorie_entreprise",
        data: {
          entreprise: {
            categorie_entreprise: "entreprise"
          }
        },
        expected: {
          categorie_entreprise: "entreprise"
        }
      },
      {
        it: "does copy siren",
        data: {
          entreprise: {
            siren: "lasirène"
          }
        },
        expected: {
          siren: "lasirène"
        }
      },
      {
        it: "does copy raison_sociale",
        data: {
          entreprise: {
            raison_sociale: "Phil Electrique"
          }
        },
        expected: {
          raison_sociale: "Phil Electrique"
        }
      },
      {
        it: "does copy nom_commercial",
        data: {
          entreprise: {
            nom_commercial: "Phil Electrique"
          }
        },
        expected: {
          nom_commercial: "Phil Electrique"
        }
      },
      {
        it: "does copy nom",
        data: {
          entreprise: {
            nom: "Electrique"
          }
        },
        expected: {
          nom: "Electrique"
        }
      },
      {
        it: "does copy prenom",
        data: {
          entreprise: {
            prenom: "Phil"
          }
        },
        expected: {
          prenom: "Phil"
        }
      },
      {
        it: "does copy siret_siege_social",
        data: {
          entreprise: {
            siret_siege_social: "siretasiation"
          }
        },
        expected: {
          siret_siege_social: "siretasiation"
        }
      },
      {
        it: "does copy capital_social",
        data: {
          entreprise: {
            capital_social: 100000
          }
        },
        expected: {
          capital_social: 100000
        }
      },
      {
        it: "expects tranche_effectif_salarie_entreprise to be an object",
        data: {
          entreprise: {
            tranche_effectif_salarie_entreprise: null
          }
        },
        expected: {}
      },
      {
        it: "sets unknown data about tranche_effectif to undefined",
        data: {
          entreprise: {
            tranche_effectif_salarie_entreprise: {
              date_reference: 2015
            }
          }
        },
        expected: {
          annee_tranche_effectif: 2015,
          tranche_effectif: undefined
        }
      },
      {
        it: "extract data about tranche_effectif",
        data: {
          entreprise: {
            tranche_effectif_salarie_entreprise: {
              date_reference: 2015,
              intitule: "Tranche 2"
            }
          }
        },
        expected: {
          annee_tranche_effectif: 2015,
          tranche_effectif: "Tranche 2"
        }
      },
      {
        it: "add mandataires_sociaux data",
        data: {
          entreprise: {
            mandataires_sociaux: [
              {
                fonction: "Président",
                prenom: "Michel",
                nom: "Michot"
              },
              {
                fonction: "Direction",
                raison_sociale: "Michel Industries"
              }
            ]
          }
        },
        expected: {
          mandataires_sociaux: [
            {
              nom: "Michot",
              prenom: "Michel",
              fonction: "Président",
              raison_sociale: undefined
            },
            {
              nom: undefined,
              prenom: undefined,
              raison_sociale: "Michel Industries",
              fonction: "Direction"
            }
          ]
        }
      }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      it(testCase.it || `tests case n°${i + 1}`, async () => {
        const result = await getEntreprise(
          testCase.identifier || null,
          {
            get: args =>
              Promise.resolve({
                data:
                  typeof testCase.data === "function"
                    ? testCase.data(...args)
                    : testCase.data
              })
          },
          {}
        );

        expect(result).toEqual(testCase.expected);
      });
    }
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await getEntreprise("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
