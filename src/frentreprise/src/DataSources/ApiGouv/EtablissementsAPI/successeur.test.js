import { nestcribe_path as test } from "../../../../tests/utils";

import successeur from "./successeur";

test("DataSources/ApiGouv/EtablissementsAPI/successeur", () => {
  it("gets successeur", async () => {
    const date = new Date();
    const validData = {
      successeur_siret: "12345678945612",
      successeur_date_etablissement: +date
    };

    expect(
      await successeur(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                successeur: validData
              }
            })
        },
        {}
      )
    ).toEqual({
      successeur: {
        siret: validData.successeur_siret,
        date_transfert: date
      }
    });
  });

  it("handles invalid data", async () => {
    expect(
      await successeur(
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
      await successeur(
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

    const result = await successeur("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
