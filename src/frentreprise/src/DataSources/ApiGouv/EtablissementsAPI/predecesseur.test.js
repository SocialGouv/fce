import { nestcribe_path as test } from "../../../../tests/utils";

import predecesseur from "./predecesseur";

test("DataSources/ApiGouv/EtablissementsAPI/predecesseur", () => {
  it("gets predecesseur", async () => {
    const date = new Date();
    const validData = {
      predecesseur_siret: "12345678945612",
      predecesseur_date_etablissement: +date
    };

    expect(
      await predecesseur(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                predecesseur: validData
              }
            })
        },
        {}
      )
    ).toEqual({
      predecesseur: {
        siret: validData.predecesseur_siret,
        date_transfert: date
      }
    });
  });

  it("handles invalid data", async () => {
    expect(
      await predecesseur(
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
      await predecesseur(
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

    const result = await predecesseur("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
