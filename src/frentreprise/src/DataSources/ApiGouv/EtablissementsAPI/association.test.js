import { nestcribe_path as test } from "../../../../tests/utils";

import association from "./association";

test("DataSources/ApiGouv/EtablissementsAPI/association", () => {
  it("gets association only if etat is true and it has an id", async () => {
    const validData = { etat: true, id: 123 };

    expect(
      await association(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                association: validData
              }
            })
        },
        {}
      )
    ).toEqual({
      association: validData
    });

    expect(
      await association(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                association: { id: 1243, etat: false }
              }
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await association(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                association: { id: null, etat: true }
              }
            })
        },
        {}
      )
    ).toEqual({});
  });

  it("handles invalid data", async () => {
    expect(
      await association(
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
      await association(
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

    const result = await association("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
