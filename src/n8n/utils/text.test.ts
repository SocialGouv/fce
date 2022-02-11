import {trimRows} from "./text";

describe("text", () => {
  describe("trimRows", () => {
    const text = `first
second
third`;

    it("should trim the first row", () => {
      expect(trimRows(text, 1)).toEqual(`second
third`);
    });

    it("should trim the first 2 rows", () => {
      expect(trimRows(text, 2)).toEqual(`third`);
    });
  });
})
