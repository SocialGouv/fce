import { nestcribe_path as test } from "../../../../tests/utils";

import utils from "../utils";
import getLegacy from "./getLegacy";

test("DataSources/ApiGouv/EtablissementsAPI/getLegacy", () => {
  describe("sucessfully parse data", async () => {
    const testCases = [
      {
        it: "filter out null values, copy required attributes",
        data: {
          etablissement: {
            siret: "12345610",
            siege_social: false,
            enseigne: "toto",
            nom_commercial: 5,
            prenom: null,
            siret_siege_social: "1235123"
          }
        },
        expected: expect.objectContaining({
          siret: "12345610",
          siege_social: false,
          enseigne: "toto",
          nom_commercial: 5,
          nom: undefined,
          prenom: undefined,
          siret_siege_social: "1235123"
        })
      },
      {
        it: "expects etat_etablissement to be parsed",
        data: {
          etablissement: {
            etat_administratif_etablissement: {
              value: "Actif",
              date_mise_a_jour: 1296552600
            }
          }
        },
        expected: expect.objectContaining({
          etat_etablissement: {
            date: new Date(Date.UTC(2011, 1, 1, 9, 30, 0)),
            label: "Actif"
          }
        })
      },
      {
        it: "sets unknown data about etat_entreprise to undefined",
        data: {
          etablissement: {}
        },
        expected: expect.objectContaining({
          etat_etablissement: {
            label: "N/A",
            date: undefined
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
                etablissement: null
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
