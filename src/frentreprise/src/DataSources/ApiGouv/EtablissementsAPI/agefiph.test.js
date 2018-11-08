import { nestcribe_path as test } from "../../../../tests/utils";

import agefiph from "./agefiph";

test("DataSources/ApiGouv/EtablissementsAPI/agefiph", () => {
  it("gets derniere_annee_de_conformite_connue", async () => {
    const apiData = {
      derniere_annee_de_conformite_connue: 2005
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await agefiph("SIREN", Axios, {});
    expect(result).toEqual({
      agefiph_derniere_annee_conformite_connue:
        apiData.derniere_annee_de_conformite_connue
    });
  });

  it("handles invalid data", async () => {
    expect(
      await agefiph(
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
    ).toEqual({
      agefiph_derniere_annee_conformite_connue: null
    });

    expect(
      await agefiph(
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

    const result = await agefiph("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
