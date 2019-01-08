const XLSX = require("xlsx");
const WorkbookHelper = require("../../src/helpers/WorkbookHelper");

describe("getSheetsData()", () => {
  const workbook = XLSX.readFile("./data/example.xls");
  const wbh = new WorkbookHelper(workbook);

  test("default", () => {
    const sheetsData = wbh.getSheetsData();
    expect(sheetsData["Code_activite_NAF"][0]).toEqual({
      A732: "0111Z",
      "Libellé A732":
        "Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses"
    });

    expect(sheetsData["Code_Qualite_siege"][0]).toEqual({
      CODE: "1",
      LIBELLE: "Siège de direction sans autre activité"
    });

    expect(sheetsData["Source_dernier_eff_phy "][0]).toEqual({
      CODE: "110",
      "LIBELLE COURT": "EFF_CREAT",
      LIBELLE: "Effectif de l'entreprise à la création (CFE-SIRENE)"
    });
  });

  test("with sheetsParams", () => {
    const sheetsParams = {
      Code_activite_NAF: {
        columnsToKeep: {
          A: "code",
          B: "libelle"
        }
      }
    };
    const sheetsData = wbh.getSheetsData(sheetsParams);
    expect(sheetsData["Code_activite_NAF"][0]).toEqual({
      code: "0111Z",
      libelle:
        "Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses"
    });

    expect(sheetsData["Code_Qualite_siege"][0]).toEqual({
      CODE: "1",
      LIBELLE: "Siège de direction sans autre activité"
    });

    expect(sheetsData["Source_dernier_eff_phy "][0]).toEqual({
      CODE: "110",
      "LIBELLE COURT": "EFF_CREAT",
      LIBELLE: "Effectif de l'entreprise à la création (CFE-SIRENE)"
    });
  });

  test("with sheetsParams 2", () => {
    const sheetsParams = {
      Code_activite_NAF: {
        columnsToKeep: {
          A: "code",
          B: "libelle"
        }
      },
      "Source_dernier_eff_phy ": {
        columnsToKeep: {
          A: "code",
          B: "libelle_court",
          C: "libelle"
        }
      }
    };
    const sheetsData = wbh.getSheetsData(sheetsParams);
    expect(sheetsData["Source_dernier_eff_phy "][0]).toEqual({
      code: "110",
      libelle_court: "EFF_CREAT",
      libelle: "Effectif de l'entreprise à la création (CFE-SIRENE)"
    });
  });
});
