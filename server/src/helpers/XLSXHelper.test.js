const XLSX = require("xlsx");
const XLSXHelper = require("./XLSXHelper");

describe("getReferences()", () => {
  test("default", () => {
    const workSheet = {
      "!ref": "A1:I56"
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
      "!ref": "A1:AU56070"
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
      "!ref": "A1:C56"
    };
    const columnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    expect(columnNames).toEqual("ABC");
  });

  test("B to T", () => {
    const workSheet = {
      "!ref": "B16:T56"
    };
    const columnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    expect(columnNames).toEqual("BCDEFGHIJKLMNOPQRST");
  });

  test.skip("M to AB", () => {
    const workSheet = {
      "!ref": "B16:AB55"
    };
    const columnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    expect(columnNames).toEqual("TO DO");
  });


});

describe("getColumnKeys()", () => {
  const workbook = XLSX.readFile("./data/example.xls");
  
  test("default", () => {
    const sheetName = "wikit";
    const workSheet = workbook.Sheets[sheetName];

    const columnKeys = XLSXHelper.getColumnKeys(workSheet);
    expect(columnKeys).toEqual(["SIRET", "Etablissement", "Date_intervention_T", "Unite_contrôle_T", "Type_intervention_T", "cible_intervention_T"])

  });

  test("Sheet 2", () => {
    const sheetName = "Code_Qualite_siege";
    const workSheet = workbook.Sheets[sheetName];

    const columnKeys = XLSXHelper.getColumnKeys(workSheet);
    expect(columnKeys).toEqual(["CODE", "LIBELLE"])

  });

});