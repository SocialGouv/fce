const XLSXHelper = require("./XLSXHelper");

describe("getReferences()", () => {
  test("default", () => {
    const workSheet = {
      "!refs": "A1:I56"
    };

    const references = XLSXHelper.getReferences(workSheet);
    expect(references).toEqual({
      start: {
        column: "A",
        row: "1"
      },
      end: {
        column: "I",
        row: "56"
      }
    });
  });

  test("Double letters", () => {
    const workSheet = {
      "!refs": "A1:AU56070"
    };

    const references = XLSXHelper.getReferences(workSheet);
    expect(references).toEqual({
      start: {
        column: "A",
        row: "1"
      },
      end: {
        column: "AU",
        row: "56070"
      }
    });
  });
});
