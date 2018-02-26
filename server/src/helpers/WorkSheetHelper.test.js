const XLSX = require("xlsx");
const WorkSheetHelper = require("./WorkSheetHelper");

describe("getReferences()", () => {
  test("default", () => {
    const workSheet = {
      "!ref": "A1:I56"
    };
    const wsh = new WorkSheetHelper(workSheet);
    const references = wsh.getReferences();
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

    const wsh = new WorkSheetHelper(workSheet);
    const references = wsh.getReferences();
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
    const wsh = new WorkSheetHelper(workSheet);
    const columnNames = wsh.getAlphabeticalColumnNames();
    expect(columnNames).toEqual(["A", "B", "C"]);
  });

  test("B to T", () => {
    const workSheet = {
      "!ref": "B16:J56"
    };
    const wsh = new WorkSheetHelper(workSheet);
    const columnNames = wsh.getAlphabeticalColumnNames();
    expect(columnNames).toEqual(["B", "C", "D", "E", "F", "G", "H", "I", "J"]);
  });

  test("M to AB", () => {
    const workSheet = {
      "!ref": "B16:AB55"
    };
    const wsh = new WorkSheetHelper(workSheet);
    const columnNames = wsh.getAlphabeticalColumnNames();
    expect(columnNames).toEqual([
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "AA",
      "AB"
    ]);
  });

  test("M to BD", () => {
    const workSheet = {
      "!ref": "M16:AD55"
    };
    const wsh = new WorkSheetHelper(workSheet);
    const columnNames = wsh.getAlphabeticalColumnNames();
    expect(columnNames).toEqual([
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "AA",
      "AB",
      "AC",
      "AD"
    ]);
  });
});

describe("getColumnKeys()", () => {
  const workbook = XLSX.readFile("./data/example.xls");

  test("default", () => {
    const sheetName = "wikit";
    const workSheet = workbook.Sheets[sheetName];

    const wsh = new WorkSheetHelper(workSheet);
    const columnKeys = wsh.getColumnKeys();
    expect(columnKeys).toEqual([
      "SIRET",
      "Etablissement",
      "Date_intervention_T",
      "Unite_contrôle_T",
      "Type_intervention_T",
      "cible_intervention_T"
    ]);
  });

  test("Sheet 2", () => {
    const sheetName = "Code_Qualite_siege";
    const workSheet = workbook.Sheets[sheetName];

    const wsh = new WorkSheetHelper(workSheet);
    const columnKeys = wsh.getColumnKeys();
    expect(columnKeys).toEqual(["CODE", "LIBELLE"]);
  });
});

describe.only("getRowsData()", () => {
  const workbook = XLSX.readFile("./data/example.xls");

  test("default", () => {
    const sheetName = "Code_Qualite_siege_2";
    const workSheet = workbook.Sheets[sheetName];

    const wsh = new WorkSheetHelper(workSheet);
    const objects = wsh.getRowsData();

    const exampleObjects = [
      {
        CODE: "1",
        LIBELLE: "Siège de direction sans autre activité"
      },
      {
        CODE: "2",
        LIBELLE: "Siège et établissement principal"
      },
      {
        CODE: "3",
        LIBELLE: "Etablissement principal - non siège"
      }
    ];
    expect(objects).toEqual(exampleObjects);
  });

  test("with empty column", () => {
    const sheetName = "empty_column";
    const workSheet = workbook.Sheets[sheetName];
    const wsh = new WorkSheetHelper(workSheet);
    const objects = wsh.getRowsData();

    expect(objects[0]).toEqual({
      CODE: "1",
      LIBELLE: "Siège de direction sans autre activité",
    });
  });

  test("keep only some columns", () => {
    const sheetName = "wikit";
    const workSheet = workbook.Sheets[sheetName];
    const columnsToKeep = {
      A: "siret",
      C: "date",
      D: "unite",
      E: "type"
    };
    const wsh = new WorkSheetHelper(workSheet);
    const objects = wsh.getRowsData(columnsToKeep);

    expect(objects[0]).toEqual({
      siret: "1,234,567,890,001",
      date: "1/2/2017",
      unite: "Unité de contrôle n°1 de l'Hérault",
      type: "Enquête"
    });
  });
});
