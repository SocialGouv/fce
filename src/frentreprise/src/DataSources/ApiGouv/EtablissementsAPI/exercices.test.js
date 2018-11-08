import { nestcribe_path as test } from "../../../../tests/utils";

import exercices from "./exercices";

test("DataSources/ApiGouv/EtablissementsAPI/exercices", () => {
  it("gets exercices data", async () => {
    const validData = {
      exercices: [
        {
          date_fin_exercice_timestamp: new Date(2000, 0),
          ca: 30
        },
        {
          date_fin_exercice_timestamp: new Date(2001, 0),
          ca: 50
        },
        {
          date_fin_exercice_timestamp: new Date(2002, 0),
          ca: "inconnu"
        }
      ]
    };

    expect(
      await exercices(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: validData
            })
        },
        {}
      )
    ).toEqual({
      donnees_ecofi: {
        "2000-01-01T00:00:00.000Z": 30,
        "2001-01-01T00:00:00.000Z": 50,
        "2002-01-01T00:00:00.000Z": null
      }
    });
  });

  it("handles invalid data", async () => {
    expect(
      await exercices(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                invalid: true
              }
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await exercices(
        "SIREN",
        {
          get: () => Promise.resolve("")
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

    const result = await exercices("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
