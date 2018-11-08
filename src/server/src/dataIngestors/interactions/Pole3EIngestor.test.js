const Pole3EIngestor = require("./Pole3EIngestor");

describe("default", () => {
  const filePath = "./data/example.xls";
  const sheetName = "EOS_Sheet1";

  test("default", () => {
    const ingestor = new Pole3EIngestor(filePath, sheetName);
    const data = ingestor.getInteractions();
    expect(data).toEqual([
      {
        siret: "84028984100013",
        date: "10/12/2016",
        unite: "TOURISME",
        type_intervention: "Entreprise labellisée Tourisme&Handicap",
        pole: "3E"
      },
      {
        siret: "14845714700029",
        date: "12/13/2016",
        unite: "UNITE Mutations economiques",
        type_intervention: "Accélérateurs PME",
        pole: "3E"
      },
      {
        siret: "89146440600020",
        date: "5/19/2016",
        unite: "UNITE TRANSPORTS",
        pole: "3E"
      },
      {
        siret: "29855731400022",
        date: "4/21/2016",
        unite: "TOURISME",
        pole: "3E"
      },
      {
        siret: "83764530900016",
        date: "5/11/2016",
        unite: "ISSE",
        pole: "3E"
      }
    ]);
  });
});
