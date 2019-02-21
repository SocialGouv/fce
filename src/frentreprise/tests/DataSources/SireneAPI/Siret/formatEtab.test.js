import { nestcribe_path as test } from "../../../utils";

import getSettlement from "../../../../src/DataSources/SireneAPI/Siret/getSettlement";

test("DataSources/SireneAPI/Siret/getSettlement", () => {
  describe("successfully parse data", async () => {
    const testCases = [
      {
        it: "doesn't copy useless values",
        data: {
          useless: true,
          etablissement: {
            also_useless: true
          }
        },
        expected: {}
      },
      {
        it: "does copy siret",
        data: {
          etablissement: {
            siret: "siret"
          }
        },
        expected: {
          siret: "siret"
        }
      },
      {
        it: "expects true if settlement is open",
        data: {
          etablissement: {
            periodesEtablissement: [
              {
                etatAdministratifEtablissement: "A"
              }
            ]
          }
        },
        expected: {
          actif: true,
          etat_etablissement: "A"
        }
      },
      {
        it: "expects false if settlement is closed",
        data: {
          etablissement: {
            periodesEtablissement: [
              {
                etatAdministratifEtablissement: "F"
              }
            ]
          }
        },
        expected: {
          actif: false,
          etat_etablissement: "F"
        }
      },
      {
        it: "does copy etat_etablissement",
        data: {
          etablissement: {
            periodesEtablissement: [
              {
                etatAdministratifEtablissement: "A"
              }
            ]
          }
        },
        expected: {
          etat_etablissement: "A",
          actif: true
        }
      },
      {
        it: "does copy date_fin",
        data: {
          etablissement: {
            periodesEtablissement: [
              {
                dateDebut: "2019-02-06",
                etatAdministratifEtablissement: "F"
              }
            ]
          }
        },
        expected: {
          etat_etablissement: "F",
          date_fin: "2019-02-06",
          actif: false
        }
      },
      {
        it: "does copy enseigne",
        data: {
          etablissement: {
            enseigne: "Chez Michou"
          }
        },
        expected: {
          enseigne: "Chez Michou"
        }
      },
      {
        it: "does copy siege_social",
        data: {
          etablissement: {
            etablissementSiege: true
          }
        },
        expected: {
          siege_social: true,
          categorie_etablissement: "Siège social"
        }
      },
      {
        it: "does copy date_creation",
        data: {
          etablissement: {
            dateCreationEtablissement: "1985-10-26"
          }
        },
        expected: {
          date_creation: "1985-10-26"
        }
      },
      {
        it: "does copy tranche_effectif_insee",
        data: {
          etablissement: {
            trancheEffectifsEtablissement: "jambon"
          }
        },
        expected: {
          tranche_effectif_insee: "jambon"
        }
      },
      {
        it: "does copy annee_tranche_effectif_insee",
        data: {
          etablissement: {
            anneeEffectifsEtablissement: "2019"
          }
        },
        expected: {
          annee_tranche_effectif_insee: "2019"
        }
      },
      {
        it: "does copy adresse_components and format adresse",
        data: {
          etablissement: {
            adresseEtablissement: {
              numeroVoieEtablissement: "666",
              indiceRepetitionEtablissement: "",
              typeVoieEtablissement: "BOULEVARD",
              libelleVoieEtablissement: "DES CHATS MORTS",
              complementAdresseEtablissement: "",
              codePostalEtablissement: "46800",
              codeCommuneEtablissement: "46201",
              libelleCommuneEtablissement: "MONTCUQ"
            }
          }
        },
        expected: {
          adresse_components: {
            numero_voie: "666",
            indice_repetition: "",
            type_voie: "BOULEVARD",
            nom_voie: "DES CHATS MORTS",
            complement_adresse: "",
            code_postal: "46800",
            code_insee_localite: "46201",
            localite: "MONTCUQ"
          },
          adresse: "666 BOULEVARD DES CHATS MORTS\n46800\nMONTCUQ"
        }
      },
      {
        it: "does copy etablissement_employeur",
        data: {
          etablissement: {
            periodesEtablissement: [
              {
                caractereEmployeurEtablissement: "N"
              }
            ]
          }
        },
        expected: {
          etablissement_employeur: "N"
        }
      }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      it(testCase.it || `tests case n°${i + 1}`, async () => {
        let result = await getSettlement(
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

        delete result._raw;
        result = JSON.parse(JSON.stringify(result));

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

    const result = await getSettlement("ERRORSIRET", Axios, {});
    expect(result).toEqual({});
  });
});
