require("../../mongo/db");
const PoleTIngestor = require("./PoleTIngestor");
const Interaction = require("../../models/InteractionModel");
const filePath = "./data/example.xls";
const sheetName = "wikit";

const TIMEOUT = 10000;

describe("default", () => {
  test(
    "default",
    () => {
      const ingestor = new PoleTIngestor(filePath, sheetName);
      const data = ingestor.getInteractions();
      expect(data[0]).toEqual({
        siret: "1,234,567,890,001",
        date: "1/2/2017",
        unite: "Unité de contrôle n°1 de l'Hérault",
        type_intervention: "Enquête",
        cible_intervention: "Etablissement",
        pole: "T"
      });
      expect(data[3]).toEqual({
        siret: "1,234,567,890,004",
        date: "1/2/2017",
        unite: "Unité de Contrôle 1 Thématique de Haute-Garonne",
        type_intervention: "Examen de document",
        cible_intervention: "Chantier",
        pole: "T"
      });
      expect(data[4]).toEqual({
        siret: "1,234,567,890,005",
        date: "1/2/2017",
        unite: "Unité de contrôle n°3 de l'Hérault",
        type_intervention: "Examen de document",
        cible_intervention: "Etablissement",
        pole: "T"
      });
    },
    TIMEOUT
  );
});

describe("save()", () => {
  beforeEach(() => {
    return Interaction.remove({});
  });

  afterEach(() => {
    return Interaction.remove({});
  });

  test(
    "default",
    () => {
      const ingestor = new PoleTIngestor(filePath, sheetName);
      return ingestor.save().then(data => {
        expect(data.length).toBe(19);

        expect(data[0].pole).toBe("T");
        expect(data[0].date).toEqual(new Date("2017-01-02"));
        expect(data[0].type_intervention).toBe("Enquête");
      });
    },
    TIMEOUT
  );

  test(
    "save and find, and sorted by date",
    () => {
      const ingestor = new PoleTIngestor(filePath, sheetName);
      return ingestor
        .save()
        .then(data => {
          return Interaction.findBySIRET("1,234,567,890,012");
        })
        .then(data => {
          expect(data.length).toBe(2);

          expect(data[0].date).toEqual(new Date("2017-01-11"));
          expect(data[1].date).toEqual(new Date("2017-01-09"));
        });
    },
    TIMEOUT
  );
});
