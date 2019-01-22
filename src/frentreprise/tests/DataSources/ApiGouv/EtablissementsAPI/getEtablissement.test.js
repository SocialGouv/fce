import { nestcribe_path as test } from "../../../utils";

import getEtablissement from "../../../../src/DataSources/ApiGouv/EtablissementsAPI/getEtablissement";

test("DataSources/ApiGouv/EtablissementsAPI/getEtablissement", () => {
  describe("sucessfully parse data", async () => {
    const testCases = [
      {
        it: "doesn't copy useless values",
        data: { useless: true, entreprise: { also_useless: true } },
        expected: {}
      },
      {
        it: "does copy siret",
        data: {
          etablissement: {
            siret: "lesiret"
          }
        },
        expected: {
          siret: "lesiret"
        }
      },
      {
        it: "does copy enseigne",
        data: {
          etablissement: {
            enseigne: "lalala"
          }
        },
        expected: {
          enseigne: "lalala"
        }
      },
      {
        it: "does copy date_creation",
        data: {
          etablissement: {
            date_creation_etablissement: 1136156400
          }
        },
        expected: {
          date_creation: new Date(1136156400 * 1000)
        }
      },
      {
        it: "does copy naf",
        data: {
          etablissement: {
            naf: "6202A"
          }
        },
        expected: {
          naf: "6202A"
        }
      },
      {
        it: "does copy libelle_naf",
        data: {
          etablissement: {
            libelle_naf: "Conseil en systèmes et logiciels informatiques"
          }
        },
        expected: {
          libelle_naf: "Conseil en systèmes et logiciels informatiques"
        }
      },
      {
        it: "does copy region",
        data: {
          etablissement: {
            region_implantation: {
              code: "76",
              value: "Occitanie"
            }
          }
        },
        expected: {
          region: "Occitanie",
          code_region: 76
        }
      },
      {
        it: "does copy adresse",
        data: {
          etablissement: {
            adresse: {
              l1: "OCCITECH",
              l2: null,
              l3: null,
              l4: "35 BOULEVARD DES RECOLLETS",
              l5: null,
              l6: "31400 TOULOUSE",
              l7: "FRANCE",
              numero_voie: "35",
              type_voie: "BD",
              nom_voie: "DES RECOLLETS",
              complement_adresse: "B",
              code_postal: "31400",
              localite: "TOULOUSE",
              code_insee_localite: "31555",
              cedex: null
            }
          }
        },
        expected: {
          adresse: "35 BD DES RECOLLETS\nB 31400\nTOULOUSE",
          adresse_components: {
            l1: "OCCITECH",
            l2: null,
            l3: null,
            l4: "35 BOULEVARD DES RECOLLETS",
            l5: null,
            l6: "31400 TOULOUSE",
            l7: "FRANCE",
            numero_voie: "35",
            type_voie: "BD",
            nom_voie: "DES RECOLLETS",
            complement_adresse: "B",
            code_postal: "31400",
            localite: "TOULOUSE",
            code_insee_localite: "31555",
            cedex: null
          },
          departement: "31"
        }
      },
      {
        it: "does copy effectif",
        data: {
          etablissement: {
            tranche_effectif_salarie_etablissement: {
              de: 6,
              a: 9,
              code: "03",
              date_reference: "2016",
              intitule: "6 à 9 salariés"
            }
          }
        },
        expected: {
          tranche_effectif_insee: "6 à 9 salariés",
          annee_tranche_effectif_insee: 2016,
          etablissement_employeur: true
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
