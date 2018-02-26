const XLSX = require("xlsx");
const WorkbookHelper = require("./WorkbookHelper");

describe.only("getSheetData()", () => {
  test("default", () => {
    const workbook = XLSX.readFile("./data/example.xls");
    const wbh = new WorkbookHelper(workbook);
    const sheetData = wbh.getSheetData();
    console.log(sheetData);
    expect(sheetData["Code_activite_NAF"][0]).toEqual({
      "A732": "0111Z",
      "Libellé A732": "Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses"
    })

    expect(sheetData["Code_Qualite_siege"][0]).toEqual({
      "CODE": "1",
      "LIBELLE": "Siège de direction sans autre activité"
    })

    expect(sheetData["Source_dernier_eff_phy "][0]).toEqual({
      "CODE": "110",
      "LIBELLE COURT": "EFF_CREAT",
      "LIBELLE": "Effectif de l'entreprise à la création (CFE-SIRENE)"
    })
  });

});
