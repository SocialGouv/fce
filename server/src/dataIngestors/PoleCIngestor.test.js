const PoleCIngestor = require("./PoleCIngestor");

describe("default", () => {
  const filePath = "./data/example.xls";
  const sheetName = "SORA_v1";

  test("default", () => {

    let ingestor = new PoleCIngestor(filePath, sheetName);
    let data = ingestor.getInteractions();
    expect(data).toEqual([{
      "siret":"09726060400036",
      "date": "1/12/2017",
      "unite": "Brigade viticole",
      "pole": "C"
    },
    {
      "siret":"09726060400036",
      "date": "9/13/2017",
      "unite": "Concurrence",
      "pole": "C"
    }])
  })

});
