import { nestcribe_path as test } from "../../../utils";

import getEtablissement from "../../../../src/DataSources/ApiGouv/EtablissementsAPI/getEtablissement";

test("DataSources/ApiGouv/EtablissementsAPI/getEtablissement", () => {
  describe("sucessfully parse data", async () => {
    const testCases = [
      {
        it: "doesn't copy useless values",
        data: { useless: true, entreprise: { also_useless: true } },
        expected: {}
      },
      {
        it: "does copy siret",
        data: {
          etablissement: {
            siret: "lesiret"
          }
        },
        expected: {
          siret: "lesiret"
        }
      }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      it(testCase.it || `tests case n°${i + 1}`, async () => {
        const result = await getEtablissement(
          testCase.identifier || null,
          {
            get: args =>
              Promise.resolve({
                data:
                  typeof testCase.data === "function"
                    ? testCase.data(...args)
                    : testCase.data
              })
          },
          {}
        );

        expect(result).toEqual(testCase.expected);
      });
    }
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await getEtablissement("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
