import { nestcribe_path as test } from "../../../../tests/utils";

import document_association from "./document_association";

test("DataSources/ApiGouv/EtablissementsAPI/document_association", () => {
  it("gets last document Status of association", async () => {
    const validDoc = { type: "Statuts", timestamp: +new Date() };
    const data = [
      { type: "Statuts", timestamp: 50 },
      { type: "Statuts", timestamp: 5 },
      validDoc,
      { type: "Other", timestamp: new Date() + 1000 }
    ];

    expect(
      await document_association(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                documents: data
              }
            })
        },
        {}
      )
    ).toEqual({
      document_association: validDoc
    });

    expect(
      await document_association(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                documents: []
              }
            })
        },
        {}
      )
    ).toEqual({});
  });

  it("handles invalid data", async () => {
    expect(
      await document_association(
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
      await document_association(
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

    const result = await document_association("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
