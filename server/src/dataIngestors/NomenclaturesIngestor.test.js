const NomenclaturesIngestor = require("./NomenclaturesIngestor");

describe.only("default", () => {
  const filePath = "./data/example.xls";

  test("default", () => {
    const ingestor = new NomenclaturesIngestor(filePath);
    const data = ingestor.getNomenclatures();

    expect(data["Source_dernier_eff_phy "][0]).toEqual({
      categorie: "Source_dernier_eff_phy ",
      code: "110",
      libelle_court: "EFF_CREAT",
      libelle: "Effectif de l'entreprise à la création (CFE-SIRENE)"
    });

    expect(data["Code_CJ3"][0]).toEqual({
      categorie: "Code_CJ3",
      code: "10XX",
      libelle_CJ3: "Personne physique",
      libelle_CJ1: "Entrepreneur individuel"
    });
  });
});
