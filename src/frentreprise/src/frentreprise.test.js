import { nestcribe_path as test } from "../tests/utils";

import InvalidIdentifierError from "./Errors/InvalidIdentifierError";
import frentreprise, { _ as _frentreprise } from "./frentreprise";

test("frentreprise", () => {
  let consoleMuteLog, consoleMuteError;

  beforeAll(() => {
    consoleMuteLog = jest
      .spyOn(global.console, "log")
      .mockImplementation(() => {});
    consoleMuteError = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});
  });

  afterAll(() => {
    consoleMuteLog.mockReset();
    consoleMuteError.mockReset();
  });

  it("have a default ApiGouv datasource", () => {
    const ds = frentreprise.getDataSources();
    expect(ds.length).toBeGreaterThan(0);
    expect(ds[0]).toEqual(expect.objectContaining({ name: "ApiGouv" }));
  });

  it("do not add duplicate datasource", () => {
    const dsLen = frentreprise.getDataSources().length;

    const aDs = frentreprise.getDataSource("ApiGouv");
    frentreprise.addDataSource(aDs);

    expect(frentreprise.getDataSources().length).toBe(dsLen);
    expect(frentreprise.getDataSource("ApiGouv")).toBe(aDs);
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

    it(`When asked with SIREN, it gets :
    - entreprise, 
    - and siege social etablissement`, async () => {
      //  Here we cannot use jest.spyOn, because it doesn't support Symbols as
      //  function name/key to spy on.
      //
      //  Also : We use try finally, to ensure mock restore after test
      //
      const originalAskDataSource = frentreprise[_frentreprise.askDataSource];
      try {
        const testSIRET = "48776861600038";
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

        await frentreprise.getEntreprise(testSIREN);

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
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
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

    it("merges data from datasources according to priority", async () => {
      const testSIRET = "83106781400010";
      const testSIREN = "831067814";
      const getDataSources = jest
        .spyOn(frentreprise, "getDataSources")
        .mockReset()
        .mockImplementation(() => [
          {
            name: "jest5",
            priority: 500,
            source: {
              getSIREN: () =>
                Promise.resolve({
                  siren: testSIREN,
                  name: "refixed name",
                  newdata: "5000"
                }),
              getSIRET: () =>
                Promise.resolve({
                  siret: testSIRET,
                  name: "etsName",
                  _etData: {
                    newdata: "hello"
                  }
                })
            }
          },
          {
            name: "jest3",
            priority: 300,
            source: {
              getSIREN: () =>
                Promise.resolve({
                  siren: testSIREN,
                  name: "hello",
                  low: "low data priority"
                }),
              getSIRET: () =>
                Promise.resolve({
                  siret: testSIRET,
                  name: "ets"
                })
            }
          },
          {
            name: "jest1",
            priority: 100,
            source: {
              getSIREN: () =>
                Promise.resolve({
                  siren: testSIREN,
                  name: "fixed name",
                  middle: "1000 priority"
                }),
              getSIRET: () =>
                Promise.resolve({
                  siret: testSIRET,
                  city: "nyc"
                })
            }
          }
        ]);

      try {
        const result = await frentreprise.getEntreprise(testSIRET);

        expect(result).toBeInstanceOf(frentreprise.Entreprise);
        expect(result.siren).toBe("831067814");
        expect(result.name).toBe("refixed name");
        expect(result.newdata).toEqual("hello");
        expect(result.middle).toEqual("1000 priority");
        expect(result.low).toEqual("low data priority");

        expect(result.etablissements).toBeInstanceOf(Array);
        expect(result.etablissements.length).toBe(1);

        const etab = result.etablissements[0];
        expect(etab).toBeInstanceOf(frentreprise.Etablissement);
        expect(etab.siret).toEqual(testSIRET);
        expect(etab.name).toEqual("etsName");
        expect(etab.city).toEqual("nyc");
      } finally {
        getDataSources.mockRestore();
      }
    });
  });

  describe("search", () => {
    it("ignore invalid result", async () => {
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
              data: [{ siret: "foo" }]
            });
          }

          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;
        const result = await frentreprise.search("testSIRET");

        expect(result).toEqual([]);
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });

    it("logs unknown returns", async () => {
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
              data: new Error("mince")
            });
          }

          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;
        const consoleSpy = jest.spyOn(global.console, "error").mockClear();
        const result = await frentreprise.search("testSIRET");

        expect(result).toEqual([]);

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenNthCalledWith(
          1,
          expect.stringMatching(
            "Source named jest returned invalid data for search"
          ),
          expect.objectContaining({ message: "mince" })
        );
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });

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

    it("get Entreprises datas", async () => {
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
              data: [
                {
                  siren: "831067814",
                  name: "hello"
                }
              ]
            });
          }
          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;

        const testSIRET = "83106781400010";
        const result = await frentreprise.search(testSIRET);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);
        const entrepriseResult = result[0];
        expect(entrepriseResult).toBeInstanceOf(frentreprise.Entreprise);
        expect(entrepriseResult.siren).toBe("831067814");
        expect(entrepriseResult.name).toBe("hello");

        expect(adsSpy).toHaveBeenCalledTimes(1);

        expect(adsSpy).toHaveBeenNthCalledWith(
          1,
          "search",
          testSIRET,
          expect.any(Function)
        );
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });

    it("get Etablissement data", async () => {
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
              data: [
                {
                  siret: "83106781400010",
                  name: "hello"
                },
                {
                  siret: "83106781400010",
                  city: "nyc"
                }
              ]
            });
          }
          return Promise.resolve();
        });

        frentreprise[_frentreprise.askDataSource] = adsSpy;

        const testSIRET = "83106781400010";
        const result = await frentreprise.search(testSIRET);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);

        const entrepriseResult = result[0];
        expect(entrepriseResult).toBeInstanceOf(frentreprise.Entreprise);
        expect(entrepriseResult.siren).toBe("831067814");
        expect(entrepriseResult.etablissements).toBeInstanceOf(Array);
        expect(entrepriseResult.etablissements.length).toBe(1);

        const etabResult = entrepriseResult.etablissements[0];
        expect(etabResult.name).toBe("hello");
        expect(etabResult.city).toBe("nyc");

        expect(adsSpy).toHaveBeenCalledTimes(1);
      } finally {
        frentreprise[_frentreprise.askDataSource] = originalAskDataSource;
      }
    });

    it("merges data from datasources according to priority", async () => {
      const getDataSources = jest
        .spyOn(frentreprise, "getDataSources")
        .mockReset()
        .mockImplementation(() => [
          {
            name: "jest5",
            priority: 500,
            source: {
              search: () =>
                Promise.resolve([
                  {
                    siren: "831067814",
                    name: "refixed name",
                    newdata: "5000"
                  }
                ])
            }
          },
          {
            name: "jest3",
            priority: 300,
            source: {
              search: () =>
                Promise.resolve([
                  {
                    siren: "831067814",
                    name: "hello",
                    low: "low data priority"
                  }
                ])
            }
          },
          {
            name: "jest1",
            priority: 100,
            source: {
              search: () =>
                Promise.resolve([
                  {
                    siren: "831067814",
                    name: "fixed name",
                    middle: "1000 priority"
                  }
                ])
            }
          }
        ]);

      try {
        const testSIRET = "83106781400010";
        const result = await frentreprise.search(testSIRET);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);

        const entrepriseResult = result[0];
        expect(entrepriseResult).toBeInstanceOf(frentreprise.Entreprise);
        expect(entrepriseResult.siren).toBe("831067814");
        expect(entrepriseResult.name).toBe("refixed name");
        expect(entrepriseResult.newdata).toEqual("5000");
        expect(entrepriseResult.middle).toEqual("1000 priority");
        expect(entrepriseResult.low).toEqual("low data priority");
      } finally {
        getDataSources.mockRestore();
      }
    });
  });

  describe("compareDataSource sort by priority ascending", () => {
    const a = "a",
      b = "b";
    const compare = frentreprise[_frentreprise.compareDataSource];
    [
      {
        input: [{ a, priority: 1 }, { b, priority: 2 }],
        output: [{ a, priority: 1 }, { b, priority: 2 }]
      },
      {
        input: [{ a, priority: 2 }, { b, priority: 1 }],
        output: [{ b, priority: 1 }, { a, priority: 2 }]
      },
      {
        input: [{ a, priority: 3 }, { b, priority: 3 }],
        output: [{ a, priority: 3 }, { b, priority: 3 }]
      },
      {
        input: [{ b, priority: 200 }, { a, priority: 2 }],
        output: [{ a, priority: 2 }, { b, priority: 200 }]
      }
    ].forEach(testCase => {
      it(`tests with input: ${JSON.stringify(testCase.input, null, 2)}`, () => {
        expect(testCase.input.sort(compare)).toEqual(testCase.output);
      });
    });
  });

  it("askDataSource asks data sources, and call forEach callback by priority", async () => {
    const askDataSource = frentreprise[_frentreprise.askDataSource].bind(
      frentreprise
    );

    const getDataSources = jest
      .spyOn(frentreprise, "getDataSources")
      .mockReset()
      .mockImplementation(() => {
        return [
          {
            source: {
              test: () =>
                Promise.resolve({ data: "called with 200", foo: "bar" })
            },
            name: "jest2",
            priority: 200
          },
          {
            source: {
              test: () =>
                Promise.resolve({ data: "called with 400", junk: null })
            },
            name: "jest4",
            priority: 400
          },
          {
            source: {
              test: () => Promise.resolve({ data: "called with 100" })
            },
            name: "jest1",
            priority: 100
          },
          {
            source: {
              test: () =>
                Promise.resolve({ data: "called with 300", baz: "baz" })
            },
            name: "jest3",
            priority: 300
          },
          {
            source: { test: () => Promise.resolve(false) },
            name: "jest5",
            priority: 600
          }
        ];
      });
    try {
      const cbSpy = jest.fn(result => result);

      await askDataSource("test", null, cbSpy);

      expect(cbSpy).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          source: expect.objectContaining({ name: "jest1" }),
          data: { data: "called with 100" }
        }),
        expect.any(Number),
        expect.any(Object)
      );

      expect(cbSpy).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          source: expect.objectContaining({ name: "jest2" }),
          data: expect.objectContaining({ data: "called with 200" })
        }),
        expect.any(Number),
        expect.any(Object)
      );

      expect(cbSpy).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          source: expect.objectContaining({ name: "jest3" }),
          data: expect.objectContaining({ data: "called with 300", baz: "baz" })
        }),
        expect.any(Number),
        expect.any(Object)
      );

      expect(cbSpy).not.toHaveBeenNthCalledWith(
        4,
        expect.objectContaining({
          data: expect.objectContaining({ junk: null })
        }),
        expect.any(Number),
        expect.any(Object)
      );

      expect(cbSpy).toHaveBeenNthCalledWith(
        4,
        expect.objectContaining({
          source: expect.objectContaining({ name: "jest4" }),
          data: expect.objectContaining({ data: "called with 400" })
        }),
        expect.any(Number),
        expect.any(Object)
      );

      expect(cbSpy).toHaveBeenNthCalledWith(
        5,
        expect.objectContaining({
          source: expect.objectContaining({ name: "jest5" }),
          data: false
        }),
        expect.any(Number),
        expect.any(Object)
      );
    } finally {
      getDataSources.mockRestore();
    }
  });
});
