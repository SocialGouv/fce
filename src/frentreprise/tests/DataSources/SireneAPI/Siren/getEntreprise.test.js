import {
  nestcribe_path as test
} from "../../../utils";

import getEntreprise from "../../../../src/DataSources/SireneAPI/Siren/getEntreprise";

test("DataSources/SireneAPI/Siren/getEntreprise", () => {
  describe("successfully parse data", async () => {
    const testCases = [
      {
        it: "doesn't copy useless values",
        data: {
          useless: true,
          request_sirene: {
            also_useless: true
          }
        },
        expected: {}
      },
      {
        it: "does copy siren",
        data: {
          uniteLegale: {
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
          uniteLegale: {
            periodesUniteLegale: [{
              denominationUniteLegale: "Phil Electrique"
            }]
          }
        },
        expected: {
          raison_sociale: "Phil Electrique"
        }
      },
      {
        it: "does copy sigle",
        data: {
          uniteLegale: {
            sigleUniteLegale: "comme un sigle"
          }
        },
        expected: {
          sigle: "comme un sigle"
        }
      },
      {
        it: "does copy nom",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              nomUniteLegale: "Térieur"
            }]
          }
        },
        expected: {
          nom: "Térieur"
        }
      },
      {
        it: "does copy prenom",
        data: {
          uniteLegale: {
            prenom1UniteLegale: "Alain",
            prenom2UniteLegale: "",
            prenom3UniteLegale: "",
            prenom4UniteLegale: "Alex"
          }
        },
        expected: {
          prenom: "Alain Alex"
        }
      },
      {
        it: "does copy nom_commercial",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              nomUsageUniteLegale: "Térieur"
            }]
          }
        },
        expected: {
          nom_commercial: "Térieur"
        }
      },
      {
        it: "does copy categorie_entreprise",
        data: {
          uniteLegale: {
            categorieEntreprise: "Toto"
          }
        },
        expected: {
          categorie_entreprise: "Toto"
        }
      },
      {
        it: "does copy siret_siege_social",
        data: {
          uniteLegale: {
            siren: "841322266",
            periodesUniteLegale: [{
              nicSiegeUniteLegale: "00013"
            }]
          }
        },
        expected: {
          siren: "841322266",
          siret_siege_social: "84132226600013"
        }
      },
      {
        it: "does copy forme_juridique",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              categorieJuridiqueUniteLegale: "1000"
            }]
          }
        },
        expected: {
          forme_juridique_code: "1000",
          forme_juridique: "Entrepreneur individuel"
        }
      },
      {
        it: "does copy naf",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              activitePrincipaleUniteLegale: "62.01Z"
            }]
          }
        },
        expected: {
          naf: "62.01Z"
        }
      },
      {
        it: "does copy etat_entreprise",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              etatAdministratifUniteLegale: "A"
            }]
          }
        },
        expected: {
          etat_entreprise: "A"
        }
      },
      {
        it: "does copy date_creation",
        data: {
          uniteLegale: {
            dateCreationUniteLegale: "1985-10-26"
          }
        },
        expected: {
          date_de_creation: "1985-10-26"
        }
      },
      {
        it: "does copy date_de_radiation",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              dateFin: "2019-01-24"
            }]
          }
        },
        expected: {
          date_de_radiation: "2019-01-24"
        }
      },
      {
        it: "does return dateFin as date_mise_a_jour when closed",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              etatAdministratifUniteLegale: "C",
              dateFin: "2019-01-24"
            }]
          }
        },
        expected: {
          date_mise_a_jour: "2019-01-24",
          date_de_radiation: "2019-01-24",
          etat_entreprise: "C"
        }
      },
      {
        it: "does return dateDernierTraitementUniteLegale as date_mise_a_jour when open",
        data: {
          uniteLegale: {
            dateDernierTraitementUniteLegale: "2019-01-24",
            periodesUniteLegale: [{
              etatAdministratifUniteLegale: "A",
            }]
          }
        },
        expected: {
          date_mise_a_jour: "2019-01-24",
          etat_entreprise: "A"
        }
      },
      {
        it: "does copy entreprise_employeur",
        data: {
          uniteLegale: {
            periodesUniteLegale: [{
              caractereEmployeurUniteLegale: "N"
            }]
          }
        },
        expected: {
          entreprise_employeur: "N"
        }
      },
      {
        it: "does copy annee_tranche_effectif",
        data: {
          uniteLegale: {
            anneeEffectifsUniteLegale: "2019"
          }
        },
        expected: {
          annee_tranche_effectif: "2019"
        }
      },
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      it(testCase.it || `tests case n°${i + 1}`, async () => {
        let result = await getEntreprise(
          testCase.identifier || null, {
            get: args =>
              Promise.resolve({
                data: typeof testCase.data === "function" ?
                  testCase.data(...args) :
                  testCase.data
              })
          }, {}
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

  const result = await getEntreprise("ERRORSIREN", Axios, {});
  expect(result).toEqual({});
  });
});