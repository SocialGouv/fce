import { nestcribe_path as test } from "../../utils";

jest.mock("../../../src/DataSources/ApiGouv/EtablissementsAPI");
import EtablissementsAPI from "../../../src/DataSources/ApiGouv/EtablissementsAPI";
jest.mock("../../../src/DataSources/ApiGouv/EntreprisesAPI");
import EntreprisesAPI from "../../../src/DataSources/ApiGouv/EntreprisesAPI";

import {
  _ as _ApiGouv,
  default as ApiGouv
} from "../../../src/DataSources/ApiGouv/ApiGouv";

test("DataSources/ApiGouv/ApiGouv", () => {
  const apigouv = new ApiGouv("https://legouvernement.api");

  it("cannot be used for search", async () => {
    expect(await apigouv.search()).toBe(false);
  });

  it("get data from API with SIRET", async () => {
    const SIRET = "83106781400010";

    const mockedAPIs = [
      "getLegacy",
      "getLegacy",
      "getEtablissement",
      "agefiph",
      "exercices",
      "association",
      "predecesseur",
      "successeur",
      "document_association"
    ];

    let expectedResult = {};

    mockedAPIs.forEach(api => {
      const mockedImpl = siret => ({
        [api]: `API result for ${siret}`
      });

      expectedResult = {
        ...expectedResult,
        ...mockedImpl(SIRET)
      };

      EtablissementsAPI[api].mockImplementationOnce(mockedImpl);
    });

    const et_data = await apigouv.getSIRET(SIRET);
    expect(et_data).toEqual(expectedResult);
  });

  it("get data from API with SIREN", async () => {
    const SIREN = "831067814";

    const mockedAPIs = [
      "getLegacy",
      "getEntreprise",
      "attestation_acoss",
      "attestation_dgfip"
    ];

    let expectedResult = {};

    mockedAPIs.forEach(api => {
      const mockedImpl = siren => ({
        [api]: `API result for ${siren}`
      });

      expectedResult = {
        ...expectedResult,
        ...mockedImpl(SIREN)
      };

      EntreprisesAPI[api].mockImplementationOnce(mockedImpl);
    });

    const en_data = await apigouv.getSIREN(SIREN);
    expect(en_data).toEqual(expectedResult);
  });

  describe("request APIs with options", () => {
    const id = "test";
    const testingResult = { testing: true };

    const testRequestWithConfig = async (config = {}, spy = () => {}) => {
      const savedConfig = apigouv.axiosConfig;
      apigouv.axiosConfig = config;
      try {
        const out = await apigouv[_ApiGouv.requestAPIs](id, spy);
        return out;
      } finally {
        apigouv.axiosConfig = savedConfig;
      }
    };

    it("default config", async () => {
      const spy = jest.fn(() => Promise.resolve(testingResult));
      expect(await testRequestWithConfig({}, spy)).toEqual(testingResult);
      expect(spy).toHaveBeenCalledWith(
        id,
        expect.anything(),
        expect.objectContaining({
          params: expect.objectContaining({
            context: "Tiers",
            object: expect.stringMatching("Direccte")
          })
        })
      );
    });

    it("standard proxy", async () => {
      const spy = jest.fn(() => Promise.resolve(testingResult));
      const proxy = { host: "proxyhost", user: "user", password: "password" };

      expect(await testRequestWithConfig({ proxy }, spy)).toEqual(
        testingResult
      );
      expect(spy).toHaveBeenCalledWith(
        id,
        expect.anything(),
        expect.objectContaining({
          params: expect.objectContaining({
            context: "Tiers",
            object: expect.stringMatching("Direccte")
          }),
          proxy
        })
      );
    });

    it("tunnel proxy without auth", async () => {
      const spy = jest.fn(() => Promise.resolve(testingResult));

      expect(
        await testRequestWithConfig(
          {
            proxy: {
              tunnel: true,
              host: "proxy",
              port: 1234
            }
          },
          spy
        )
      ).toEqual(testingResult);

      expect(spy).toHaveBeenCalledWith(
        id,
        expect.anything(),
        expect.objectContaining({
          params: expect.objectContaining({
            context: "Tiers",
            object: expect.stringMatching("Direccte")
          }),
          proxy: false,
          httpsAgent: expect.objectContaining({
            options: expect.objectContaining({
              proxy: {
                host: "proxy",
                port: 1234
              }
            })
          })
        })
      );
    });

    it("tunnel proxy without port", async () => {
      const spy = jest.fn(() => Promise.resolve(testingResult));

      expect(
        await testRequestWithConfig(
          {
            proxy: {
              tunnel: true,
              host: "proxy"
            }
          },
          spy
        )
      ).toEqual(testingResult);

      expect(spy).toHaveBeenCalledWith(
        id,
        expect.anything(),
        expect.objectContaining({
          proxy: false,
          httpsAgent: expect.objectContaining({
            options: expect.objectContaining({
              proxy: {
                host: "proxy"
              }
            })
          })
        })
      );
    });

    it("tunnel proxy without host", async () => {
      const spy = jest.fn(() => Promise.resolve(testingResult));

      expect(
        await testRequestWithConfig(
          {
            proxy: {
              tunnel: true,
              port: 1234
            }
          },
          spy
        )
      ).toEqual(testingResult);

      expect(spy).toHaveBeenCalledWith(
        id,
        expect.anything(),
        expect.objectContaining({
          proxy: false,
          httpsAgent: expect.objectContaining({
            options: expect.objectContaining({
              proxy: {
                port: 1234
              }
            })
          })
        })
      );
    });

    const testAuth = (username, password) => async () => {
      const spy = jest.fn(() => Promise.resolve(testingResult));

      expect(
        await testRequestWithConfig(
          {
            proxy: {
              tunnel: true,
              host: "proxy",
              port: 1234,
              auth: { username, password }
            }
          },
          spy
        )
      ).toEqual(testingResult);

      expect(spy).toHaveBeenCalledWith(
        id,
        expect.anything(),
        expect.objectContaining({
          params: expect.objectContaining({
            context: "Tiers",
            object: expect.stringMatching("Direccte")
          }),
          proxy: false,
          httpsAgent: expect.objectContaining({
            options: expect.objectContaining({
              proxy: {
                host: "proxy",
                port: 1234,
                proxyAuth: `${username || ""}:${password || ""}`
              }
            })
          })
        })
      );
    };

    it("tunnel proxy with auth", testAuth("username", "password"));
    it("tunnel proxy with auth and only user", testAuth("user"));
    it(
      "tunnel proxy with auth and only password",
      testAuth(undefined, "password")
    );
    it("tunnel proxy with empty auth", testAuth());
  });
});
