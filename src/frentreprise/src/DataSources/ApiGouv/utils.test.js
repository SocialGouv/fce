import { nestcribe_path as test } from "../../../tests/utils";

import utils from "./utils";

test("DataSources/ApiGouv/utils", () => {
  describe("convertDate", () => {
    describe("returns undefined if not an unix timestamp", () => {
      [null, undefined, 0, false, "test", "", [], {}].forEach(input =>
        it(`with ${JSON.stringify(input)}`, () =>
          expect(utils.convertDate(input)).not.toBeInstanceOf(Date))
      );
    });
    it("handle unix timestamps", () => {
      const check = date => {
        expect(date).toBeInstanceOf(Date);
        expect(date.getUTCDate()).toBe(21);
        expect(date.getUTCMonth()).toBe(10 - 1); // Month starts at 0 in JS
        expect(date.getUTCFullYear()).toBe(1992);
        expect(date.getUTCHours()).toBe(13);
        expect(date.getUTCMinutes()).toBe(30);
      };

      check(utils.convertDate(719674200));
      check(utils.convertDate(719674200000));
    });
  });

  describe("getCleanAdress", () => {
    it("return clean address", () => {
      [
        {
          input: {},
          output: ""
        },
        {
          input: { numero_voie: 15 },
          output: "15"
        },
        {
          input: { numero_voie: 15, type_voie: "rue" },
          output: "15 rue"
        },
        {
          input: {
            numero_voie: 15,
            type_voie: "rue",
            nom_voie: "des boiseries"
          },
          output: "15 rue des boiseries"
        },
        {
          input: {
            numero_voie: 15,
            type_voie: "rue",
            nom_voie: "des boiseries",
            complement_adresse: "Chez Michel"
          },
          output: "15 rue des boiseries\nChez Michel"
        },
        {
          input: {
            numero_voie: 15,
            type_voie: "rue",
            nom_voie: "des boiseries",
            complement_adresse: "Chez Michel",
            code_postal: 31400
          },
          output: "15 rue des boiseries\nChez Michel 31400"
        },
        {
          input: {
            numero_voie: 15,
            type_voie: "rue",
            nom_voie: "des boiseries",
            complement_adresse: "Chez Michel",
            code_postal: 31400,
            localite: "Toulouse"
          },
          output: "15 rue des boiseries\nChez Michel 31400\nToulouse"
        },
        {
          input: {
            numero_voie: 15,
            type_voie: "rue",
            nom_voie: "des boiseries",
            complement_adresse: "Chez Michel",
            localite: "Toulouse"
          },
          output: "15 rue des boiseries\nChez Michel\nToulouse"
        },
        {
          input: {
            numero_voie: 15,
            nom_voie: "des boiseries",
            complement_adresse: "Chez Michel",
            localite: "Toulouse"
          },
          output: "15 des boiseries\nChez Michel\nToulouse"
        },
        {
          input: {
            numero_voie: 15,
            type_voie: "rue",
            nom_voie: "des boiseries",
            localite: "Toulouse"
          },
          output: "15 rue des boiseries\nToulouse"
        },
        {
          input: {
            numero_voie: 12,
            localite: "Toulouse"
          },
          output: "12\nToulouse"
        },
        {
          input: {
            localite: "Toulouse"
          },
          output: "Toulouse"
        }
      ].forEach(testCase => {
        expect(utils.getCleanAddress(testCase.input)).toEqual(testCase.output);
      });
    });
  });

  describe("RequestAPI", () => {
    it("calls callback when there is returned data", async () => {
      const callback = jest.fn((out, data) => {
        out.mydata = data.mydata;
      });
      const data = { mydata: 123 };
      const result = await utils.requestAPI(
        {
          get: () => Promise.resolve({ data })
        },
        "http://url",
        {},
        callback
      );

      expect(result).toEqual({ mydata: 123 });
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(Object), data);
    });

    it("Returns empty object without calling cb when there is no returned data", async () => {
      const callback = jest.fn();
      const result = await utils.requestAPI(
        {
          get: () => Promise.resolve({ data: null })
        },
        "http://url",
        {},
        callback
      );

      expect(result).toEqual({});
      expect(callback).toHaveBeenCalledTimes(0);
    });

    describe("logs when it fails", () => {
      [
        {
          it: "log exception object if it doesn't contain a request",
          url: "http://anerror",
          axiosGet: url =>
            Promise.reject(new Error("TypeError somewhere we do not know why")),
          expected: url => [
            expect.any(Error),
            expect.objectContaining({
              message: "TypeError somewhere we do not know why"
            })
          ]
        },
        {
          it: "Prints an error",
          url: "http://anerror",
          axiosGet: url =>
            Promise.reject({
              message: "Forbidden",
              response: {
                data: { error: true, reason: "Hello this is an error" }
              },
              request: {
                _currentUrl: url
              }
            }),
          expected: url => [
            expect.stringContaining("Forbidden"),
            expect.stringContaining("Hello this is an error")
          ]
        },
        {
          it: "Prints raw data in error",
          url: "http://anerror",
          axiosGet: url =>
            Promise.reject({
              message: "Forbidden",
              response: {
                data: "ERROR OCCURED OH NO!"
              },
              request: {
                _currentUrl: url
              }
            }),
          expected: url => [expect.stringContaining("ERROR OCCURED OH NO!")]
        },
        {
          it: "infer url from request responseUrl",
          url: "http://anerror",
          axiosGet: url =>
            Promise.reject({
              message: "ERRCONN",
              request: {
                res: { responseUrl: url }
              }
            }),
          expected: url => [
            expect.stringContaining("ERRCONN"),
            expect.stringContaining(url)
          ]
        },
        {
          it: "infer url from request _currentUrl if there is no response",
          url: "http://anerror",
          axiosGet: url =>
            Promise.reject({
              message: "ERRCONN",
              request: {
                _currentUrl: url
              }
            }),
          expected: url => [
            expect.stringContaining("ERRCONN"),
            expect.stringContaining(url)
          ]
        },
        {
          it:
            "infer url from config without baseUrl if there is no response but there is a _currentRequest with path",
          url: "http://anerror/oups",
          axiosGet: url =>
            Promise.reject({
              message: "ERRCONN",
              request: {
                _currentRequest: { path: "/oups" }
              }
            }),
          expected: url => [
            expect.stringContaining("ERRCONN"),
            expect.stringContaining("(unknown host)/oups")
          ]
        },
        {
          it:
            "infer url from config baseUrl if there is no response but there is a _currentRequest with path",
          url: "http://anerror/oups",
          axiosGet: url =>
            Promise.reject({
              message: "ERRCONN",
              request: {
                _currentRequest: { path: "/oups" }
              },
              config: {
                baseURL: "http://anerror"
              }
            }),
          expected: url => [
            expect.stringContaining("ERRCONN"),
            expect.stringContaining("http://anerror/oups")
          ]
        },
        {
          it:
            "infer url from config baseUrl if there is no response but there is a request path",
          url: "http://anerror/oups",
          axiosGet: url =>
            Promise.reject({
              message: "ERRCONN",
              request: {
                path: "/oups"
              },
              config: {
                baseURL: "http://anerror"
              }
            }),
          expected: url => [
            expect.stringContaining("ERRCONN"),
            expect.stringContaining("http://anerror/oups")
          ]
        },
        {
          it: "show unknown url if there is no way to infer url",
          url: "http://anerror/oups",
          axiosGet: url =>
            Promise.reject({
              message: "ERRCONN",
              request: {}
            }),
          expected: url => [
            expect.stringContaining("ERRCONN"),
            expect.stringContaining("unknown url")
          ]
        }
      ].forEach((testCase, index) => {
        it(testCase.it || `tests case n°${index}`, async () => {
          const consoleSpy = jest
            .spyOn(global.console, "error")
            .mockReset()
            .mockImplementationOnce(() => {});

          const result = await utils.requestAPI(
            {
              get: testCase.axiosGet
            },
            testCase.url,
            {},
            () => {}
          );

          expect(result).toEqual({});
          testCase
            .expected(testCase.url)
            .forEach(expectation =>
              expect(consoleSpy).toHaveBeenCalledWith(expectation)
            );
        });
      });
    });
  });
});
