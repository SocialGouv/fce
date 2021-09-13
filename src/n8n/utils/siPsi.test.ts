import {getSiPsiFileDate} from "./siPsi";

describe("SI Psi utils", () => {
  describe("getSiPsiFileDate", () => {
    it("should parse valid file paths", () => {
      const filePath = "/tmp/download/ClientsPSI-Siren-2021-06072021.csv";

      expect(getSiPsiFileDate(filePath)).toBe("06-07-2021");
    });
  })
})
