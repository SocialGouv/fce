const PoleTIngestor = require("./PoleTIngestor");

describe("default", () => {
  const filePath = "./data/example.xls";
  const sheetName = "wikit";

  test("default", () => {

    const ingestor = new PoleTIngestor(filePath, sheetName);
    const data = ingestor.getInteractions();
    expect(data[0]).toEqual({
      "siret":"1,234,567,890,001",
      "date": "1/2/2017",
      "unite": "Unité de contrôle n°1 de l'Hérault",
      "type_intervention":"Enquête",
      "cible_intervention": "Etablissement",
      "pole": "T"
    });
    expect(data[3]).toEqual({
      "siret":"1,234,567,890,004",
      "date": "1/2/2017",
      "unite": "Unité de Contrôle 1 Thématique de Haute-Garonne",
      "type_intervention": "Examen de document",
      "cible_intervention": "Chantier",
      "pole": "T"
    });
    expect(data[4]).toEqual({
      "siret":"1,234,567,890,005",
      "date": "1/2/2017",
      "unite": "Unité de contrôle n°3 de l'Hérault",
      "type_intervention": "Examen de document",
      "cible_intervention": "Etablissement",
      "pole": "T"
    });
  })

});
