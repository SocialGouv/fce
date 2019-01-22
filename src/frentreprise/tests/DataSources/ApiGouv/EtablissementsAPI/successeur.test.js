import { nestcribe_path as test } from "../../../utils";

import successeur from "../../../../src/DataSources/ApiGouv/EtablissementsAPI/successeur";

test("DataSources/ApiGouv/EtablissementsAPI/successeur", () => {
  it("gets successeur", async () => {
    const apiData = {
      successeur: {
        siret: "48776861600038",
        successeur_siret: "48776861600020",
        successeur_date_etablissement: 1473631200000,
        transfert_siege: true
      }
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await successeur("SIRET", Axios, {});
    expect(result).toEqual({
      successeur: {
        siret: "48776861600020",
        date_transfert: new Date(1473631200000),
        transfert_siege: true
      }
    });
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await successeur("ERRORSIREN", Axios, {});
    expect(result).toEqual(undefined);
  });
});
