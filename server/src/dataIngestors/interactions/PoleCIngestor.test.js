const PoleCIngestor = require("./PoleCIngestor");

describe("default", () => {
  const filePath = "./data/example.xls";
  const sheetName = "SORA_v1";

  test("default", () => {
    const ingestor = new PoleCIngestor(filePath, sheetName);
    const data = ingestor.getInteractions();
    expect(data).toEqual([
      {
        siret: "09726060400036",
        date: "1/12/2017",
        unite: "Brigade viticole",
        pole: "C"
      },
      {
        siret: "09726060400036",
        date: "9/13/2017",
        unite: "Concurrence",
        pole: "C"
      }
    ]);
  });
});
