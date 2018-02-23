const XLSX = require("xlsx");
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

describe("getAlphabeticalColumns()", () => {
  test("default", () => {
    const workSheet = {
      "!refs": "A1:C56"
    };
    const columnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    expect(columnNames).toEqual("ABC");
  });

  test("B to T", () => {
    const workSheet = {
      "!refs": "B16:T56"
    };
    const columnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    expect(columnNames).toEqual("BCDEFGHIJKLMNOPQRST");
  });

  test.skip("M to AB", () => {
    const workSheet = {
      "!refs": "B16:AB55"
    };
    const columnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    expect(columnNames).toEqual("TO DO");
  });

});