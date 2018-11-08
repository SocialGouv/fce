import { nestcribe_path as test } from "../../../../tests/utils";

import utils from "../utils";
import getLegacy from "./getLegacy";

test("DataSources/ApiGouv/EntreprisesAPI/getLegacy", () => {
  describe("sucessfully parse data", async () => {
    const testCases = [
      {
        it: "filter out null values, copy required attributes",
        data: {
          entreprise: {
            siren: "12345610",
            raison_sociale: false,
            nombre_etablissements_actifs: 5,
            nom_commercial: "abc",
            nom: null,
            siret_siege_social: "1235123",
            forme_juridique: "forme A"
          }
        },
        expected: expect.objectContaining({
          siren: "12345610",
          raison_sociale: false,
          nombre_etablissements_actifs: 5,
          nom_commercial: "abc",
          nom: undefined,
          prenom: undefined,
          siret_siege_social: "1235123",
          categorie_juridique: "forme A"
        })
      },
      {
        it: "expects dates to be parsed",
        data: {
          entreprise: {
            date_creation: 1296552600,
            date_radiation: 1296552600
          }
        },
        expected: expect.objectContaining({
          date_de_creation: new Date(Date.UTC(2011, 1, 1, 9, 30, 0)),
          date_de_radiation: new Date(Date.UTC(2011, 1, 1, 9, 30, 0))
        })
      },
      {
        it: "sets unknown data about etat_entreprise to undefined",
        data: {
          entreprise: {}
        },
        expected: expect.objectContaining({
          etat_entreprise: {
            label: "N/A",
            date: undefined
          }
        })
      },
      {
        it: "set data about etat_entreprise",
        data: {
          entreprise: {
            etat_administratif: {
              value: "Actif",
              date_mise_a_jour: 1262304000
            }
          }
        },
        expected: expect.objectContaining({
          etat_entreprise: {
            label: "Actif",
            date: new Date(Date.UTC(2010))
          }
        })
      }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      it(testCase.it || `tests case n°${i + 1}`, async () => {
        const result = await getLegacy(
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

        if (typeof testCase.expected === "function") {
          testCase.expected(result);
        } else {
          expect(result).toEqual(testCase.expected);
        }
      });
    }
  });

  it("handles invalid data", async () => {
    expect(
      await getLegacy(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: null
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await getLegacy(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                entreprise: null
              }
            })
        },
        {}
      )
    ).toEqual({});
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await getLegacy("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
