import { nestcribe_path as test } from "../../../../tests/utils";

import utils from "../utils";
import getEtablissement from "./getEtablissement";

test("DataSources/ApiGouv/EtablissementsAPI/getEtablissement", () => {
  describe("sucessfully parse data", async () => {
    const testCases = [
      {
        it: "doesn't copy useless values",
        data: { useless: true, etablissement: { also_useless: true } },
        expected: {
          activite: null,
          code_region: 0,
          date_creation: undefined,
          region: undefined
        }
      },
      {
        it: "does copy date_creation",
        data: {
          etablissement: {
            date_creation_etablissement: +new Date(2000, 10)
          }
        },
        expected: expect.objectContaining({
          date_creation: new Date(2000, 10)
        })
      },
      {
        it: "expects address to be cleaned and department to be extracted",
        data: {
          etablissement: {
            adresse: {
              type_voie: "rue",
              nom_voie: "des fleurs",
              localite: "toulouse",
              code_insee_localite: "31400"
            }
          }
        },
        expected: expect.objectContaining({
          adresse: "rue des fleurs\ntoulouse",
          adresse_components: {
            type_voie: "rue",
            nom_voie: "des fleurs",
            localite: "toulouse",
            code_insee_localite: "31400"
          },
          departement: "31"
        })
      },
      {
        it: "expects address to be cleaned and department not to be extracted",
        data: {
          etablissement: {
            adresse: {
              type_voie: "rue",
              nom_voie: "des fleurs",
              localite: "toulouse"
            }
          }
        },
        expected: expect.objectContaining({
          adresse: "rue des fleurs\ntoulouse",
          adresse_components: {
            type_voie: "rue",
            nom_voie: "des fleurs",
            localite: "toulouse"
          },
          departement: false
        })
      },
      {
        it: "handles invalid value in tranche_effectif",
        data: {
          etablissement: {
            tranche_effectif_salarie_etablissement: { date_reference: 0 }
          }
        },
        expected: expect.objectContaining({
          tranche_effectif_insee: undefined
        })
      },
      {
        it:
          "copy code_region, region, activite, etablissement_employeur, tranche_effectif_insee",
        data: {
          etablissement: {
            region_implantation: {
              code: 2415,
              value: "toto"
            },
            naf: "12345",
            libelle_naf: "test abc",
            tranche_effectif_salarie_etablissement: {
              intitule: "test",
              date_reference: 2004,
              de: 0,
              a: 25
            }
          }
        },
        expected: {
          activite: "12345 - test abc",
          annee_tranche_effectif_insee: 2004,
          code_region: 2415,
          date_creation: undefined,
          etablissement_employeur: true,
          region: "toto",
          tranche_effectif_insee: "test"
        }
      }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      it(testCase.it || `tests case n°${i + 1}`, async () => {
        const result = await getEtablissement(
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

  it("handles invalid data", async () => {
    expect(
      await getEtablissement(
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
      await getEtablissement(
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

    const result = await getEtablissement("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
