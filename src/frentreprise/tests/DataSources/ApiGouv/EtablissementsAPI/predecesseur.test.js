import { nestcribe_path as test } from "../../../utils";

import predecesseur from "../../../../src/DataSources/ApiGouv/EtablissementsAPI/predecesseur";

test("DataSources/ApiGouv/EtablissementsAPI/predecesseur", () => {
  it("gets predecesseur", async () => {
    const apiData = {
      predecesseur: {
        siret: "48776861600038",
        predecesseur_siret: "48776861600020",
        predecesseur_date_etablissement: 1473631200000,
        transfert_siege: true
      }
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await predecesseur("SIRET", Axios, {});
    expect(result).toEqual({
      predecesseur: {
        siret: "48776861600020",
        date_transfert: new Date(1473631200000)
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

    const result = await predecesseur("ERRORSIREN", Axios, {});
    expect(result).toEqual(undefined);
  });
});
