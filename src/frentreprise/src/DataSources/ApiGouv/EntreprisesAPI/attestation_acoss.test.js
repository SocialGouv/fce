import { nestcribe_path as test } from "../../../../tests/utils";

import utils from "../utils";
import attestation_acoss from "./attestation_acoss";

test("DataSources/ApiGouv/EntreprisesAPI/attestation_acoss", () => {
  it("gets url", async () => {
    const apiData = {
      url: "http://attestation_url"
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await attestation_acoss("SIREN", Axios, {});
    expect(result).toEqual({ attestation_acoss: apiData.url });
  });

  it("handles invalid data", async () => {
    expect(
      await attestation_acoss(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {}
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await attestation_acoss(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: null
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await attestation_acoss(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                url: new Date()
              }
            })
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

    const result = await attestation_acoss("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
