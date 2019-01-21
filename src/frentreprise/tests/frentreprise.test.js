import { nestcribe_path as test } from "./utils";

import InvalidIdentifierError from "../src/Errors/InvalidIdentifierError";
import frentreprise, { _ as _frentreprise } from "../src/frentreprise";

test("frentreprise", () => {
  it("have a default ApiGouv datasource", () => {
    const ds = frentreprise.getDataSources();
    expect(ds.length).toBeGreaterThan(0);
    expect(ds[0]).toEqual(expect.objectContaining({ name: "ApiGouv" }));
  });

  it("can get, delete and add a datasource", () => {
    const dsLen = frentreprise.getDataSources().length;
    expect(dsLen).toBeGreaterThan(0);

    const aDs = frentreprise.getDataSource("ApiGouv");

    frentreprise.removeDataSource(aDs);
    expect(frentreprise.getDataSources().length).toBe(dsLen - 1);
    expect(frentreprise.getDataSource("ApiGouv")).toBe(undefined);

    frentreprise.addDataSource(aDs);
    expect(frentreprise.getDataSources().length).toBe(dsLen);
    expect(frentreprise.getDataSource("ApiGouv")).toBe(aDs);
  });

  describe("getEntreprise", () => {
    it("refuses invalid SIRET or SIREN", async () => {
      const invalid = "toto123";

      let error;
      try {
        await frentreprise.getEntreprise(invalid);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(InvalidIdentifierError);
      expect(error.message).toEqual(
        expect.stringContaining("Invalid SIRET or SIREN")
      );
    });

    it(`When asked with SIRET, it gets :
    - entreprise,
    - asked etablissement,
    - and siege social etablissement if it is different`, async () => {
      //  Here we cannot use jest.spyOn, because it doesn't support Symbols as
      //  function name/key to spy on.
      //
      //  Also : We use try finally, to ensure mock restore after test
      //
      const originalAskDataSource = frentreprise[_frentreprise.askDataSource];
      try {
        const testSIRET = "48776861600038";
        const testSIRET2 = "48776861600020";
        const testSIREN = "487768616";

        // mock askDataSource responses
        const adsSpy = jest.fn((action, id, dataCallback) => {
          if (action === "getSIREN" && id === testSIREN) {
            dataCallback({
              source: { name: "jest", priority: 1 },
              data: { siret_siege_social: testSIRET }
            });
          }

          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;

        await frentreprise.getEntreprise(testSIRET);

        expect(adsSpy).toHaveBeenCalledTimes(2);

        expect(adsSpy).toHaveBeenNthCalledWith(
          1,
          "getSIREN",
          testSIREN,
          expect.any(Function)
        );

        expect(adsSpy).toHaveBeenNthCalledWith(
          2,
          "getSIRET",
          testSIRET,
          expect.any(Function)
        );

        adsSpy.mockClear();

        await frentreprise.getEntreprise(testSIRET2);

        expect(adsSpy).toHaveBeenCalledTimes(3);

        expect(adsSpy).toHaveBeenNthCalledWith(
          1,
          "getSIREN",
          testSIREN,
          expect.any(Function)
        );

        expect(adsSpy).toHaveBeenNthCalledWith(
          2,
          "getSIRET",
          testSIRET,
          expect.any(Function)
        );

        expect(adsSpy).toHaveBeenNthCalledWith(
          3,
          "getSIRET",
          testSIRET2,
          expect.any(Function)
        );
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });

    it(`Ignore invalid SIRET when looking for siege social SIRET`, async () => {
      //  Here we cannot use jest.spyOn, because it doesn't support Symbols as
      //  function name/key to spy on.
      //
      //  Also : We use try finally, to ensure mock restore after test
      //
      const originalAskDataSource = frentreprise[_frentreprise.askDataSource];
      try {
        const testSIRET = "48776861600038";
        const testSIREN = "487768616";
        const invalidSIRET = "pouet";

        // mock askDataSource responses
        const adsSpy = jest.fn((action, id, dataCallback) => {
          if (action === "getSIREN" && id === testSIREN) {
            dataCallback({
              source: { name: "jest", priority: 1 },
              data: { siret_siege_social: invalidSIRET }
            });
          }

          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;

        await frentreprise.getEntreprise(testSIRET);

        expect(adsSpy).toHaveBeenCalledTimes(2);

        expect(adsSpy).toHaveBeenNthCalledWith(
          1,
          "getSIREN",
          testSIREN,
          expect.any(Function)
        );

        expect(adsSpy).toHaveBeenNthCalledWith(
          2,
          "getSIRET",
          testSIRET,
          expect.any(Function)
        );
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });

    it(`returns data from data sources when looking for an entreprise`, async () => {
      //  Here we cannot use jest.spyOn, because it doesn't support Symbols as
      //  function name/key to spy on.
      //
      //  Also : We use try finally, to ensure mock restore after test
      //
      const originalAskDataSource = frentreprise[_frentreprise.askDataSource];
      try {
        const testSIREN = "487768616";
        const testSIRET = "48776861600038";
        const testEntData = {
          siren: testSIREN,
          name: "hello ent",
          siret_siege_social: testSIRET
        };
        const testEtData = { name: "hello etab", siret: testSIRET };

        // mock askDataSource responses
        const adsSpy = jest.fn((action, id, dataCallback) => {
          if (action === "getSIREN" && id === testSIREN) {
            dataCallback({
              source: { name: "jest", priority: 1 },
              data: testEntData
            });
          }

          if (action === "getSIRET" && id === testSIRET) {
            dataCallback({
              source: { name: "jest", priority: 1 },
              data: testEtData
            });
          }

          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;

        const testResult = await frentreprise.getEntreprise(testSIRET);

        expect(testResult).toBeInstanceOf(frentreprise.Entreprise);
        expect(testResult.name).toEqual(testEntData.name);
        expect(testResult.siege_social_siret).toEqual(
          testEntData.siege_social_siret
        );

        expect(testResult.etablissements).toBeInstanceOf(Array);
        expect(testResult.etablissements.length).toBe(1);

        const etab = testResult.etablissements[0];
        expect(etab).toBeInstanceOf(frentreprise.Etablissement);
        expect(etab.name).toEqual(testEtData.name);
        expect(etab.siret).toEqual(testEtData.siret);
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });
  });

  describe("search", () => {
    it("Returns false when an error occured", async () => {
      //  Here we cannot use jest.spyOn, because it doesn't support Symbols as
      //  function name/key to spy on.
      //
      //  Also : We use try finally, to ensure mock restore after test
      //
      const originalAskDataSource = frentreprise[_frentreprise.askDataSource];
      try {
        // mock askDataSource responses
        const adsSpy = jest.fn((action, id, dataCallback) => {
          if (action === "search") {
            dataCallback({
              source: { name: "jest" },
              data: { error: true, message: "Error occured" }
            });
          }

          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;

        const consoleSpy = jest.spyOn(global.console, "error").mockClear();

        const result = await frentreprise.search("testSIRET");

        expect(result).toBe(false);

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenNthCalledWith(
          1,
          expect.stringMatching(
            "Source named jest returned invalid data for search"
          ),
          expect.objectContaining({ error: true })
        );

        expect(adsSpy).toHaveBeenCalledTimes(1);

        expect(adsSpy).toHaveBeenNthCalledWith(
          1,
          "search",
          "testSIRET",
          expect.any(Function)
        );
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });

    it("Returns empty array and logs when search is not supported", async () => {
      //  Here we cannot use jest.spyOn, because it doesn't support Symbols as
      //  function name/key to spy on.
      //
      //  Also : We use try finally, to ensure mock restore after test
      //
      const originalAskDataSource = frentreprise[_frentreprise.askDataSource];
      try {
        // mock askDataSource responses
        const adsSpy = jest.fn((action, id, dataCallback) => {
          if (action === "search") {
            dataCallback({
              source: { name: "jest" },
              data: false
            });
          }

          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;

        const consoleSpy = jest.spyOn(global.console, "log").mockClear();

        const result = await frentreprise.search("testSIRET");

        expect(result).toEqual([]);

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenNthCalledWith(
          1,
          expect.stringMatching("Source named jest doesn't support search")
        );

        expect(adsSpy).toHaveBeenCalledTimes(1);

        expect(adsSpy).toHaveBeenNthCalledWith(
          1,
          "search",
          "testSIRET",
          expect.any(Function)
        );
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });
  });
});
